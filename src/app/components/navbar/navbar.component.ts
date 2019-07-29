import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    constructor(public route: Router) { }

    getTitle() {
        let title = this.route.url;
        title = title.substring(1);
        if (this.listTitles.find(x => x.path === title)) {
            return title;
        }
        return 'Dashboard';
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
}
