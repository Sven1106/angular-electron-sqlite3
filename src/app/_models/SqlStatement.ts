export interface SqlStatement {
    targetColumns?: string[]
    table?: string
    where?: object
    values?: object
    join?: JoinClause
    limit?: number
    orderBy?: OrderByClause[]
}

export interface OrderByClause {
    column: string
    order?: 'desc' | 'asc'
}

export interface JoinClause {
    joiningTable: string
    tableFK: string
    joiningTablePK: string
}
