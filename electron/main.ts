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
    try {
      const trayBounds = tray.getBounds()
      const windowBounds = trayWindow.getBounds()

      const x = Math.round(
        trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
      )

      const y =
        process.platform === 'darwin'
          ? Math.round(trayBounds.y + trayBounds.height + 4)
          : Math.round(trayBounds.y - windowBounds.height - 4)

      if (isNaN(x) || isNaN(y)) {
        trayWindow.center()
      } else {
        trayWindow.setPosition(x, y, false)
      }

      trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show()
    } catch (err) {
      console.error('Erro ao posicionar janela do tray:', err)
      trayWindow.center()
      trayWindow.show()
    }
  })
}

app.whenReady().then(() => {
  createTrayWindow()
  setupTray()

  // trayWindow.once('ready-to-show', () => {
  //   trayWindow.center()
  //   trayWindow.show()
  // })

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
