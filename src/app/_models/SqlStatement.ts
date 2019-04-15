import { JoinClause } from './JoinClause';
import { OrderByClause } from './OrderByClause';

export interface SqlStatement {
    targetColumns?: string[];
    table?: string;
    where?: object;
    values?: object;
    join?: JoinClause;
    limit?: number;
    orderBy?: OrderByClause[];
}
