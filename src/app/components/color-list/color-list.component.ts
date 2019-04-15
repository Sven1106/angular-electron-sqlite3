import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from '../../_services/database.service';
import { SqlStatement } from '../../_models/SqlStatement';

@Component({
    selector: 'app-color-list',
    templateUrl: './color-list.component.html',
    styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {
    getAllSql: SqlStatement;
    colors: any;
    constructor(
        private databaseService: DatabaseService,
        private zone: NgZone
    ) {}
    ngOnInit() {
        this.getAllSql = {
            targetColumns: ['*'],
            table: 'Color',
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
                this.colors = arg;
                console.log(arg);
                this.databaseService.removeAllListeners('getAll');
                console.log(
                    'getAll took: ' + (getAllTimeEnd - getAllTimeStart) + 'ms'
                );
            });
        });
    }
}
