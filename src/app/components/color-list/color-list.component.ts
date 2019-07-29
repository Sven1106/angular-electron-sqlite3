import { Component, OnInit } from '@angular/core'
import { DatabaseService } from '../../_services/database.service'
import { SqlStatement } from '../../_models/SqlStatement'

@Component({
    selector: 'app-color-list',
    templateUrl: './color-list.component.html',
    styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {
    colorsSql: SqlStatement
    colors: any
    constructor(private databaseService: DatabaseService) {}
    ngOnInit() {
        this.colorsSql = {
            targetColumns: ['*'],
            table: 'Color',
            orderBy: [
                {
                    column: 'Id',
                    order: 'asc',
                },
            ],
        }
        this.databaseService.sendToDbAndListen(
            'get',
            this.colorsSql,
            (event, arg) => {
                this.colors = arg
            }
        )
    }
}
