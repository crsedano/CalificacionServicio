import { ElectronAPI } from '@electron-toolkit/preload'
import { configuracion } from '@renderer/type/configuracion'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    CargaConfig: {
      getConfiguracion: () => configuracion
    }
  
  }
}
