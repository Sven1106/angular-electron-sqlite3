import { ColorListComponent } from './components/color-list/color-list.component';
import { PalletEntryListComponent } from './components/palletEntry-list/palletEntry-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'color-list',
        component: ColorListComponent
    },
    {
        path: 'palletEntry-list',
        component: PalletEntryListComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
