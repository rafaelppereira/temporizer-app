import { app, BrowserWindow, ipcMain, nativeImage, Tray } from 'electron'
import * as path from 'path'

let trayWindow: BrowserWindow
let tray: Tray

const isDev = !!process.env.VITE_DEV_SERVER_URL

function createTrayWindow() {
  trayWindow = new BrowserWindow({
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
  })

  if (isDev) {
    trayWindow.loadURL(process.env.VITE_DEV_SERVER_URL!)
  } else {
    trayWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

function setupTray() {
  const trayIcon = nativeImage.createFromPath(
    path.join(__dirname, '../assets/tray.png'),
  )

  tray = new Tray(trayIcon)
  tray.setToolTip('Temporizer')

  tray.on('click', () => {
    const trayBounds = tray.getBounds()
    const windowBounds = trayWindow.getBounds()

    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
    )
    const y = Math.round(trayBounds.y + trayBounds.height + 4)

    trayWindow.setPosition(x, y, false)
    trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show()
  })
}

app.whenReady().then(() => {
  createTrayWindow()
  setupTray()

  if (process.platform === 'darwin') {
    app.dock?.hide()
  }

  app.on('browser-window-blur', () => {
    if (trayWindow && trayWindow.isVisible()) {
      trayWindow.hide()
    }
  })

  // 🔔 Responde ao React quando o tempo acabar
  ipcMain.on('notify-finished', () => {
    if (!trayWindow.isVisible()) {
      trayWindow.show()
      trayWindow.focus()
    }
  })
})
