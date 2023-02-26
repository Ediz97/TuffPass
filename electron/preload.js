const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectIcon: () => ipcRenderer.invoke('selectIcon')
});