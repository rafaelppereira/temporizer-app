import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  notifyFinished: () => ipcRenderer.send('notify-finished'),
})
