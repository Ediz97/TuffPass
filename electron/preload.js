const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectIcon: () => ipcRenderer.invoke('selectIcon'),
    getAccounts: (key) => ipcRenderer.invoke('getAccounts', key),
    updateAccounts: (accounts, AESKey) => ipcRenderer.invoke('updateAccounts', accounts, AESKey),
    hash: (password) => ipcRenderer.invoke('hash', password),
    firstRun: () => ipcRenderer.invoke('firstRun'),
    createFile: (masterPassword) => ipcRenderer.invoke('createFile', masterPassword)
});