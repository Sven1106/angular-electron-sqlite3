import { DatabaseService } from './_services/database.service';
import { SqlStatement } from './_models/SqlStatement';
import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from './_services/electron.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private electronService: ElectronService) {}
    ngOnInit() {
        this.electronService.ipcRenderer.on(
            'asynchronous-message',
            (event, message) => {
                console.log(message);
            }
        );
    }
}
