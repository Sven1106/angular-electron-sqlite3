import { Injectable, NgZone } from '@angular/core'
import { ElectronService } from './electron.service'

import { SqlStatement } from '../_models/SqlStatement'
import { remote } from 'electron'

const dbProcessId = remote.getGlobal('dbProcessId')

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    constructor(
        private electronService: ElectronService,
        private zone: NgZone
    ) {}
    public sendTo(webContentsId: number, channel: string, arg: SqlStatement) {
        this.electronService.ipcRenderer.sendTo(webContentsId, channel, arg)
    }
    public send(channel: string, ...args: any) {
        this.electronService.ipcRenderer.send(channel, args)
    }
    public on(channel: string, listener: Function): void {
        this.electronService.ipcRenderer.on(channel, (evt, args) =>
            listener(evt, args)
        )
    }
    public removeAllListeners(channel: string) {
        this.electronService.ipcRenderer.removeAllListeners(channel)
    }

    public sendToDbAndListen(
        channel: string,
        sql: SqlStatement,
        listener: Function
    ) {
        const getAllTimeStart = performance.now()
        this.electronService.ipcRenderer.sendTo(dbProcessId, channel, sql)
        this.electronService.ipcRenderer.on(
            channel,
            (event: any, args: any) => {
                this.zone.run(() => {
                    const getAllTimeEnd = performance.now()
                    console.log(
                        channel +
                            ' took: ' +
                            (getAllTimeEnd - getAllTimeStart) +
                            'ms'
                    )
                    listener(event, args)
                    this.electronService.ipcRenderer.removeAllListeners(channel)
                })
            }
        )
    }
}
