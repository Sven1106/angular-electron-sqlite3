import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';


import * as path from 'path';
import { SqlStatement } from '../_models/SqlStatement';
const { remote } = require('electron');
const dbProcessId = remote.getGlobal('dbProcessId');


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private electronService: ElectronService) {
  }
  public sendTo(channel: string, arg: SqlStatement) {
    this.electronService.ipcRenderer.sendTo(dbProcessId, channel, arg);
  }
  public send(channel: string, ...args: any) {
    this.electronService.ipcRenderer.send(channel, args);
  }
  public on(channel: string, listener: Function): void {
    this.electronService.ipcRenderer.on(channel, (evt, args) => listener(evt, args));
  }
  public removeAllListeners(channel: string) {
    this.electronService.ipcRenderer.removeAllListeners(channel);
  }

}

// ipcRenderer.on('insert', (event, arg) => {
//   console.log(arg);
// });
// ipcRenderer.on('get', (event, arg) => {
//   console.log(arg);
// });
// ipcRenderer.on('getAll', (event, arg) => {
//   console.log(arg);
// });
// ipcRenderer.on('update', (event, arg) => {
//   console.log(arg);
// });
// ipcRenderer.on('delete', (event, arg) => {
//   console.log(arg);
// });