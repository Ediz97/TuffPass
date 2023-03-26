const { default: _default } = require('concurrently');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { join } = require('path');
const { updateAccounts, getAccounts } = require('./file-io.cjs');

app.whenReady().then(main);

function main() {
    const win = new BrowserWindow({
        width: 1200, 
        height: 800, 
        minWidth: 450,
        minHeight: 500,
        show: false,
        autoHideMenuBar: false,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            spellcheck: false
        },
    });

    // win.webContents.openDevTools();

    win.loadFile(join(__dirname, "../public/index.html"));
    win.on("ready-to-show", win.show);
}

ipcMain.handle('selectIcon', () => {
    return dialog.showOpenDialogSync({
        title: 'Select Account Icon',
        defaultPath: app.getPath('userData'),
        filters: [{ name: 'Icons', extensions: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'icns', 'gif']}],
        properties: [
            'openFile',
        ]
    });
});

ipcMain.handle('getAccounts', () => {
    return getAccounts();
});

ipcMain.on('updateAccounts', (event, accounts) => {
    updateAccounts(accounts);
});