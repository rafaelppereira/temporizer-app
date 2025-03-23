"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
let trayWindow;
let tray;
const isDev = !!process.env.VITE_DEV_SERVER_URL;
function createTrayWindow() {
    trayWindow = new electron_1.BrowserWindow({
        width: 360,
        height: 300,
        show: false,
        frame: false,
        hasShadow: true,
        resizable: false,
        alwaysOnTop: true,
        transparent: true,
        skipTaskbar: true,
        fullscreenable: false,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    if (isDev) {
        trayWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    }
    else {
        trayWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}
function setupTray() {
    const trayIcon = electron_1.nativeImage.createFromPath(path.join(__dirname, '../assets/tray.png'));
    tray = new electron_1.Tray(trayIcon);
    tray.setToolTip('Temporizer');
    tray.on('click', () => {
        try {
            const trayBounds = tray.getBounds();
            const windowBounds = trayWindow.getBounds();
            const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
            const y = process.platform === 'darwin'
                ? Math.round(trayBounds.y + trayBounds.height + 4)
                : Math.round(trayBounds.y - windowBounds.height - 4);
            if (isNaN(x) || isNaN(y)) {
                trayWindow.center();
            }
            else {
                trayWindow.setPosition(x, y, false);
            }
            trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show();
        }
        catch (err) {
            console.error('Erro ao posicionar janela do tray:', err);
            trayWindow.center();
            trayWindow.show();
        }
    });
}
electron_1.app.whenReady().then(() => {
    createTrayWindow();
    setupTray();
    // trayWindow.once('ready-to-show', () => {
    //   trayWindow.center()
    //   trayWindow.show()
    // })
    if (process.platform === 'darwin') {
        electron_1.app.dock?.hide();
    }
    electron_1.app.on('browser-window-blur', () => {
        if (trayWindow && trayWindow.isVisible()) {
            trayWindow.hide();
        }
    });
    // 🔔 Responde ao React quando o tempo acabar
    electron_1.ipcMain.on('notify-finished', () => {
        if (!trayWindow.isVisible()) {
            trayWindow.show();
            trayWindow.focus();
        }
    });
});
