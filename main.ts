import { CustomGlobal } from './global.d';

import { app, BrowserWindow, ipcMain } from 'electron';

import * as windowState from 'electron-window-state';
import { info } from 'electron-log';
import * as path from 'path';
import * as url from 'url';
declare const global: CustomGlobal;

global.dbProcessId // global variable for the DbProcessId
// #region DISABLE SECURITY WARNINGS.
// only for local web development
delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
// #endregion

let mainWindow, serve, dbProcessWindow;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
function createMainWindow() {
  //#region winState
  const winState = windowState({
    defaultWidth: 1200,
    defaultHeight: 600
  });


  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    minWidth: 600,
    minHeight: 300,
    x: winState.x,
    y: winState.y,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false
  });

  winState.manage(mainWindow);

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }



  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.quit();
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (serve) {
      mainWindow.webContents.openDevTools();
    }
  });
}
function createDatabaseWindow() {
  dbProcessWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 435,
    y: 440,
    show: false
  });
  dbProcessWindow.loadFile('./database/dbProcess.html');
  dbProcessWindow.on('closed', () => {
    dbProcessWindow = null;
  });

  dbProcessWindow.once('ready-to-show', () => {
    dbProcessWindow.show();
    dbProcessWindow.webContents.openDevTools();
  });
  global.dbProcessId = dbProcessWindow.webContents.id;
}


try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createDatabaseWindow();
    createMainWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }

  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createMainWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
