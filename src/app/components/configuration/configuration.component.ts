import { Company } from './../../_models/company'
import { Component, OnInit } from '@angular/core'
import { SqlStatement } from '../../_models/SqlStatement'
import { DatabaseService } from '../../_services/database.service'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
    myForm: FormGroup
    company: Company[]
    companySql: SqlStatement
    constructor(private databaseService: DatabaseService) {
        this.companySql = {
            targetColumns: ['*'],
            table: 'Company',
            where: {
                id: 1,
            },
        }
        this.databaseService.sendToDbAndListen(
            'get',
            this.companySql,
            (evt, arg) => {
                this.company = arg
            }
        )
    }

    ngOnInit() {}
}
