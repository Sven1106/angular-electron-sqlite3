import { Component, OnInit, NgZone } from '@angular/core';
import { SqlStatement } from '../../_models/SqlStatement';
import { DatabaseService } from '../../_services/database.service';

@Component({
    selector: 'app-palletEntry-list',
    templateUrl: './palletEntry-list.component.html',
    styleUrls: ['./palletEntry-list.component.scss']
})
export class PalletEntryListComponent implements OnInit {
    getAllSql: SqlStatement;
    palletEntries: any;
    constructor(
        private databaseService: DatabaseService,
        private zone: NgZone
    ) {}
    ngOnInit() {
        this.getAllSql = {
            targetColumns: ['PalletEntry.*', 'Color.Name'],
            table: 'PalletEntry',
            join: {
                joiningTable: 'Color',
                tableFK: 'ColorId',
                joiningTablePK: 'Id'
            },
            limit: 50,
            orderBy: [
                {
                    column: 'Id',
                    order: 'asc'
                }
            ]
        };
        const getAllTimeStart = performance.now();
        this.databaseService.sendTo('getAll', this.getAllSql);
        this.databaseService.on('getAll', (event, arg) => {
            this.zone.run(() => {
                const getAllTimeEnd = performance.now();
                this.palletEntries = arg;
                console.log(arg);
                this.databaseService.removeAllListeners('getAll');
                console.log(
                    'getAll took: ' + (getAllTimeEnd - getAllTimeStart) + 'ms'
                );
            });
        });
    }
}
