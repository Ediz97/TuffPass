const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { join } = require('path');
const { updateAccounts, getAccounts, hash, firstRun, createFile, getIconPath } = require('./file-io.cjs');

app.whenReady().then(main);

function main() {
    const win = new BrowserWindow({
        width: 1200, 
        height: 800, 
        minWidth: 450,
        minHeight: 500,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            spellcheck: false
        },
    });
    
    win.loadFile(join(__dirname, "../public/index.html"));
    win.on("ready-to-show", win.show);
}

// The showOpenDialogSync method returns an array, containing a string of the absolute path of the image. The join method turns the array into a string, and by using split and grabbing the second index, we get the relative path.
ipcMain.handle('selectIcon', () => {
    return getIconPath();
});

ipcMain.handle('getAccounts', (event, key) => {
    return getAccounts(key);
});

ipcMain.handle('updateAccounts', (event, accounts, AESKey) => {
    return updateAccounts(accounts, AESKey);
});

ipcMain.handle('hash', (event, password) => {
    return hash(password);
})

ipcMain.handle('firstRun', () => {
    return firstRun();
})

ipcMain.handle('createFile', (event, masterPassword) => {
    createFile(masterPassword);
})