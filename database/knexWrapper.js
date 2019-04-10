const path = require('path');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

let _db;
let dbPath;

module.exports.dbInit = async (databasePath) => {
    dbPath = databasePath;
    console.log('Initializing the database');
    var dbExists = fs.existsSync(dbPath);
    if (!dbExists) {
        dbCreate(dbPath);
    }
    else {
        let tableCount;
        dbOpen(dbPath);
        await _db.table('sqlite_master')
            .select(_db.raw('count(*) as count'))
            .first().then((data) => {
                tableCount = data.count;
            });
        if (tableCount === 0) {
            console.log('It is an empty SQLite3 database');
            dbCreate(dbPath);
        }
        else {
            console.log('The database has', tableCount, 'tables.');
        }
        dbClose(_db);
    }
}

function dbCreate(dbPath) {
    let db = new sqlite3.Database(dbPath);
    const schema = fs.readFileSync(path.join(__dirname, 'databaseSchema.sql'), 'utf8');
    db.exec('PRAGMA journal_mode=WAL;' + schema);
    console.log('The database was created');
    db.close();
    console.log('The database connection is closed');
}

function dbOpen(databaseFileName) {
    _db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: databaseFileName
        },
        useNullAsDefault: true
    });
    console.log('The database connection is open');
}

function dbClose(database) {
    database.destroy();
    console.log('The database connection is closed');
}

module.exports.get = async (sql) => {
    let response;
    dbOpen(dbPath);
    var t0 = performance.now();
    await _db
        .select(sql.targetColumns)
        .from(sql.table)
        .join(sql.join.joiningTable, sql.join.tableFK, sql.join.joiningTablePK)
        .where(sql.where)
        .then((data) => {
            response = data
            var t1 = performance.now();
            console.log('get took: ' + (t1 - t0) + " ms.")
            dbClose(_db);
        })
    return response;
}

module.exports.getAll = async (sql) => {
    let response;
    dbOpen(dbPath);
    var t0 = performance.now();
    await _db
        .select(sql.targetColumns)
        .from(sql.table)
        .join(sql.join.joiningTable, sql.join.tableFK, sql.join.joiningTablePK)
        .debug()
        .then((data) => {
            response = data
            var t1 = performance.now();
            console.log('getAll took: ' + (t1 - t0) + " ms.")
            dbClose(_db);
        });
    return response;
}
module.exports.insert = async (sql) => {
    let response;
    dbOpen(dbPath);
    var t0 = performance.now();
    await _db
        .insert(sql.values)
        .into(sql.table)
        .then((data) => {
            response = data
            var t1 = performance.now();
            console.log('insert took: ' + (t1 - t0) + " ms.")
            dbClose(_db);
        });
    return response;
}
module.exports.update = async (sql) => {
    let response;
    dbOpen(dbPath);
    var t0 = performance.now();
    await _db(sql.table)
        .update(sql.values)
        .where(sql.where)
        .then((data) => {
            response = data
            var t1 = performance.now();
            console.log('update took: ' + (t1 - t0) + " ms.")
            dbClose(_db);
        });
    return response;
}
module.exports.delete = async (sql) => {
    let response;
    dbOpen(dbPath);
    var t0 = performance.now();
    await _db(sql.table)
        .where(sql.where)
        .del()
        .then((data) => {
            response = data
            var t1 = performance.now();
            console.log('delete took: ' + (t1 - t0) + " ms.")
            dbClose(_db);
        });
    return response;
}

