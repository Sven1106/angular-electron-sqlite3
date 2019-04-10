import { Component, OnInit } from '@angular/core';
import { ElectronService } from './_services/electron.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private electronService: ElectronService) {

  }
  ngOnInit() {

    if (this.electronService.isElectron()) {
      // console.log('Mode electron');
      // console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      // console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      // console.log('Mode web');
    }
  }
}
