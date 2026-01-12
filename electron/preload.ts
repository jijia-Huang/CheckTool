import { contextBridge, ipcRenderer } from 'electron';

// 暴露受保護的方法給渲染程序使用
contextBridge.exposeInMainWorld('electronAPI', {
  selectDirectory: () => ipcRenderer.invoke('dialog:selectDirectory'),
  readDirectory: (dirPath: string) => ipcRenderer.invoke('fs:readDirectory', dirPath),
  parseExcelHeaders: (filePathOrBuffer: string | ArrayBuffer) => 
    ipcRenderer.invoke('excel:parseHeaders', filePathOrBuffer),
  readExcelColumn: (filePathOrBuffer: string | ArrayBuffer, columnName: string) => 
    ipcRenderer.invoke('excel:readColumn', filePathOrBuffer, columnName),
});
