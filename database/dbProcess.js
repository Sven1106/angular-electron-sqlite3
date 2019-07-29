/* eslint-disable no-console */
console.log('This is the Database Process')

const knexWrapper = require('./knexWrapper')
const log = require('electron-log')
const { ipcRenderer, remote } = require('electron')
const path = require('path')

const rendererProcessId = remote.getGlobal('rendererProcessId')
const app = remote.app
const appPath = app.getPath('userData')
const dbPath = path.join(appPath, 'database.db')

const formElement = document.getElementById('form')
formElement.addEventListener('submit', e => {
    e.preventDefault()
    let message = document.getElementById('sendInput').value
    ipcRenderer.sendTo(rendererProcessId, 'asynchronous-message', message)
})

knexWrapper.dbInit(dbPath)
ipcRenderer.on('get', (event, params) => {
    let response
    ;(async () => {
        try {
            response = await knexWrapper.get(params)
        } catch (error) {
            log.warn(error)
        }
        ipcRenderer.sendTo(event.senderId, 'get', response)
    })()
})

ipcRenderer.on('insert', (event, params) => {
    let response
    ;(async () => {
        try {
            console.log(params)
            response = await knexWrapper.insert(params)
        } catch (error) {
            log.warn(error)
        }
        ipcRenderer.sendTo(event.senderId, 'insert', response)
    })()
})

ipcRenderer.on('update', (event, params) => {
    let response
    ;(async () => {
        try {
            console.log(params)
            response = await knexWrapper.update(params)
        } catch (error) {
            log.warn(error)
        }
        ipcRenderer.sendTo(event.senderId, 'update', response)
    })()
})

ipcRenderer.on('delete', (event, params) => {
    let response
    ;(async () => {
        try {
            console.log(params)
            response = await knexWrapper.delete(params)
        } catch (error) {
            log.warn(error)
        }
        ipcRenderer.sendTo(event.senderId, 'delete', response)
    })()
})
