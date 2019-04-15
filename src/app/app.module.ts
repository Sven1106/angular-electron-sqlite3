import { ColorListComponent } from './components/color-list/color-list.component';
import { PalletEntryListComponent } from './components/palletEntry-list/palletEntry-list.component';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCoffee,
    faHome,
    faTh,
    faDesktop,
    faCaretUp,
    faCaretDown,
    faPalette,
    faPallet,
    faCogs
} from '@fortawesome/free-solid-svg-icons';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WebviewDirective } from './directives/webview.directive';
import { NavbarComponent } from './components/navbar/navbar.component';

// Add an icon to the library for convenient access in other components
library.add(
    faCoffee,
    faHome,
    faTh,
    faDesktop,
    faCaretUp,
    faCaretDown,
    faCaretUp,
    faCogs,
    faPalette,
    faPallet
);
@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        SidebarComponent,
        PalletEntryListComponent,
        ColorListComponent,
        WebviewDirective
    ],
    imports: [
        CollapseModule,
        AppRoutingModule,
        BrowserModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
