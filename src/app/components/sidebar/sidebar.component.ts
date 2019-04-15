import {
    Component,
    OnInit,
    ElementRef,
    ChangeDetectorRef,
    HostBinding
} from '@angular/core';
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'desktop', class: '' },
    { path: '', title: 'Table', icon: 'th', class: '' },
    { path: 'palletEntry-list', title: 'PalletEntry', icon: 'th', class: '' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    // alternatively also the host parameter in the @Component()` decorator can be used
    @HostBinding('class.mini') isMiniNav = true;

    isCollapsed = true;
    constructor() {}

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
