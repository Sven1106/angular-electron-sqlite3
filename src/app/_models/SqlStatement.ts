import { JoinClause } from './JoinClause';

export interface SqlStatement {
    targetColumns?: string[];
    table?: string;
    where?: object;
    values?: object;
    join?: JoinClause;
}
