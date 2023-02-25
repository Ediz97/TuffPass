const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

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
        },
    });

    win.webContents.openDevTools();

    win.loadFile(join(__dirname, "../public/index.html"));
    win.on("ready-to-show", win.show);
}