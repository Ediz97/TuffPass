const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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

    // win.webContents.openDevTools();

    win.loadFile(join(__dirname, "../public/index.html"));
    win.on("ready-to-show", win.show);
}

ipcMain.handle('selectIcon', () => {
    return dialog.showOpenDialogSync({
        title: 'Select Account Icon',
        filters: [{ name: 'Icons (png, jpg, jpeg, svg, ico, icns, gif)', extensions: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'icns', 'gif']}],
        properties: [
            'openFile',
        ]
    });
    // if (canceled) {
    //     return;
    // } else {
    //     return filePath;
    // }
});