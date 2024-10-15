import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { join } from 'path'
import fs from 'fs'
// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    const filePath = join(__dirname, '..', '..', 'resources', 'config.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err)
        return
      }
      const jsonData = JSON.parse(data)
      contextBridge.exposeInMainWorld('CargaConfig', {
        getConfiguracion: () => jsonData
      })
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
