/* eslint-disable no-console */
const path = require('path')
const fs = require('fs')
let sqlite3 = require('sqlite3').verbose()

let _db
let dbPath

module.exports.dbInit = databasePath => {
    return new Promise(resolve => {
        ;(async () => {
            dbPath = databasePath
            console.log(getTime() + ' Initializing the database')
            let dbExists = fs.existsSync(dbPath)
            if (!dbExists) {
                await dbCreate(dbPath)
                await module.exports.dbSeed(dbPath)
            } else {
                let tableCount
                dbOpen(dbPath)
                await _db
                    .table('sqlite_master')
                    .select(_db.raw('count(*) as count'))
                    .first()
                    .then(data => {
                        tableCount = data.count
                    })
                if (tableCount === 0) {
                    console.log(getTime() + ' It is an empty SQLite3 database')
                    await dbCreate(dbPath)
                    await module.exports.dbSeed(dbPath)
                } else {
                    console.log(
                        getTime() + ' The database has',
                        tableCount,
                        'tables.'
                    )
                }
                dbClose(_db)
            }
            resolve()
        })()
    })
}

const dbCreate = dbPath => {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbPath)
        console.log(getTime() + ' The database connection is open')
        const schema = fs.readFileSync(
            path.join(__dirname, 'databaseSchema.sql'),
            'utf8'
        )
        db.exec('PRAGMA journal_mode=WAL;' + schema, () => {
            console.log(getTime() + ' The database was created')
            db.close()
            console.log(getTime() + ' The database connection is closed')
            resolve()
        })
    })
}

module.exports.dbSeed = databasePath => {
    return new Promise(resolve => {
        let db = new sqlite3.Database(databasePath)
        console.log(getTime() + ' The database connection is open')
        const seeding = fs.readFileSync(
            path.join(__dirname, 'databaseSeeding.sql'),
            'utf8'
        )
        console.log(getTime() + ' Seeding the database')
        let t0 = performance.now()
        db.exec(seeding, () => {
            let t1 = performance.now()
            console.log(getTime() + ' Seeding took: ' + (t1 - t0) + ' ms.')
            db.close()
            console.log(getTime() + ' The database connection is closed')
            resolve()
        })
    })
}

const dbOpen = databasePath => {
    _db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: databasePath,
        },
        useNullAsDefault: true,
    })
    console.log(getTime() + ' The database connection is open')
}

const dbClose = database => {
    database
        .destroy()
        .then(console.log(getTime() + ' The database connection is closed'))
}

module.exports.get = sql => {
    return new Promise(resolve => {
        ;(async () => {
            let response
            dbOpen(dbPath)
            let t0 = performance.now()
            await _db
                .select(sql.targetColumns)
                .from(sql.table)
                .modify(function(queryBuilder) {
                    if (sql.limit !== undefined) {
                        queryBuilder.limit(sql.limit)
                    }
                    if (sql.join !== undefined) {
                        let tableFK = sql.table + '.' + sql.join.tableFK
                        let joiningTablePK =
                            sql.join.joiningTable +
                            '.' +
                            sql.join.joiningTablePK

                        queryBuilder.join(
                            sql.join.joiningTable,
                            tableFK,
                            joiningTablePK
                        )
                    }
                    if (sql.where !== undefined) {
                        queryBuilder.where(sql.where)
                    }
                    if (sql.orderBy !== undefined) {
                        queryBuilder.orderBy(sql.orderBy)
                    }
                })
                // .debug()
                .then(data => {
                    response = data
                    let t1 = performance.now()
                    console.log(getTime() + ' Get took: ' + (t1 - t0) + ' ms.')
                    dbClose(_db)
                })
            resolve(response)
        })()
    })
}

module.exports.insert = sql => {
    return new Promise(resolve => {
        ;(async () => {
            let response
            dbOpen(dbPath)
            let t0 = performance.now()
            await _db
                .insert(sql.values)
                .into(sql.table)
                .then(data => {
                    response = data
                    let t1 = performance.now()
                    console.log(
                        getTime() + ' Insert took: ' + (t1 - t0) + ' ms.'
                    )
                    dbClose(_db)
                })
            resolve(response)
        })()
    })
}
module.exports.update = sql => {
    return new Promise(resolve => {
        ;(async () => {
            let response
            dbOpen(dbPath)
            let t0 = performance.now()
            await _db(sql.table)
                .update(sql.values)
                .where(sql.where)
                .then(data => {
                    response = data
                    let t1 = performance.now()
                    console.log(
                        getTime() + ' Update took: ' + (t1 - t0) + ' ms.'
                    )
                    dbClose(_db)
                })
            resolve(response)
        })()
    })
}

module.exports.delete = sql => {
    return new Promise(resolve => {
        ;(async () => {
            let response
            dbOpen(dbPath)
            let t0 = performance.now()
            await _db(sql.table)
                .where(sql.where)
                .del()
                .then(data => {
                    response = data
                    let t1 = performance.now()
                    console.log(
                        getTime() + ' Delete took: ' + (t1 - t0) + ' ms.'
                    )
                })
            resolve(response)
        })()
    })
}

const getTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const ms = date.getMilliseconds()
    return (
        '[' +
        (hours < 10 ? '0' : '') +
        hours +
        ':' +
        (min < 10 ? '0' : '') +
        min +
        ':' +
        (sec < 10 ? '0' : '') +
        sec +
        '.' +
        (ms < 10 ? '00' : ms < 100 ? '0' : '') +
        ms +
        ']'
    )
}
