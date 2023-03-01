const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectIcon: () => ipcRenderer.invoke('selectIcon'),
    getAccounts: () => ipcRenderer.invoke('getAccounts'),
    updateAccounts: (accounts) => ipcRenderer.send('updateAccounts', accounts)
});