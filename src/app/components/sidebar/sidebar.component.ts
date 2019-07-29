import { Company } from './../../_models/company'
import { Component, OnInit, HostBinding } from '@angular/core'
import { DatabaseService } from '../../_services/database.service'
import { SqlStatement } from '../../_models/SqlStatement'
export interface RouteInfo {
    path: string
    title: string
    icon: string
    class: string
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'desktop', class: '' },
    { path: '', title: 'Table', icon: 'th', class: '' },
    { path: 'color-list', title: 'Color', icon: 'palette', class: '' },
    {
        path: 'palletEntry-list',
        title: 'PalletEntry',
        icon: 'pallet',
        class: '',
    },
    { path: 'configuration', title: 'Configuration', icon: 'th', class: '' },
]

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    companySql: SqlStatement
    company: Company
    public firmName = 'Firm Name'
    public menuItems: any[]
    // alternatively also the host parameter in the @Component()` decorator can be used
    @HostBinding('class.mini') isMiniNav = true

    isCollapsed = true
    constructor(private databaseService: DatabaseService) {}

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem)

        this.companySql = {
            targetColumns: ['*'],
            table: 'Company',
            where: { Id: '1' },
        }
        this.databaseService.sendToDbAndListen(
            'get',
            this.companySql,
            (evt, arg) => {
                this.company = arg[0]
                this.firmName = this.company.Name
            }
        )
    }
}
