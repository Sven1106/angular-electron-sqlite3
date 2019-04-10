import { SqlStatement } from './../../_models/SqlStatement';
import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from '../../_services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  palletEntries: any = [];
  title = 'App works !';
  getSql: SqlStatement;
  constructor(private databaseService: DatabaseService, private zone: NgZone) {
    this.getSql = {
      targetColumns: ['PalletEntry.*', 'Color.Name'],
      table: 'PalletEntry',
      where: { 'PalletEntry.id': 1 },
      join: {
        joiningTable: 'Color',
        tableFK: 'PalletEntry.ColorId',
        joiningTablePK: 'Color.Id'
      }
    };
    this.databaseService.sendTo('get', this.getSql);


    this.databaseService.on('get', (event, args) => {
      this.zone.run(() => {
        this.palletEntries = args;
        console.log(this.palletEntries);
        this.title = this.palletEntries[0].Name;
        console.log(this.palletEntries[0].Name);
      });
    });
  }

  ngOnInit() {
  }

}
