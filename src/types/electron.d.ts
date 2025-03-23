export {}

declare global {
  interface Window {
    electronAPI: {
      notifyFinished: () => void
    }
  }
}
