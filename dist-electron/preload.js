"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    notifyFinished: () => electron_1.ipcRenderer.send('notify-finished'),
});
