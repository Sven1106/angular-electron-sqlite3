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
    constructor(public route: Router) {}

    getTitle() {
        let title = this.route.url;
        title = title.substring(1);
        console.log(title);
        for (let item = 0; item < this.listTitles.length; item++) {
            console.log(this.listTitles[item].path);
            if (this.listTitles[item].path === title) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
}
