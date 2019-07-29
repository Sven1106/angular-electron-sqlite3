import { Component, OnInit } from '@angular/core'
import { SqlStatement } from '../../_models/SqlStatement'
import { DatabaseService } from '../../_services/database.service'

@Component({
    selector: 'app-palletEntry-list',
    templateUrl: './palletEntry-list.component.html',
    styleUrls: ['./palletEntry-list.component.scss'],
})
export class PalletEntryListComponent implements OnInit {
    palletEntriesSql: SqlStatement
    palletEntries: any
    constructor(private databaseService: DatabaseService) {}
    ngOnInit() {
        this.palletEntriesSql = {
            targetColumns: ['PalletEntry.*', 'Color.Name'],
            table: 'PalletEntry',
            join: {
                joiningTable: 'Color',
                tableFK: 'ColorId',
                joiningTablePK: 'Id',
            },
            limit: 50,
            orderBy: [
                {
                    column: 'Id',
                    order: 'asc',
                },
            ],
        }

        this.databaseService.sendToDbAndListen(
            'get',
            this.palletEntriesSql,
            (evt, arg) => {
                this.palletEntries = arg
            }
        )
    }
}
