import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import * as XLSX from 'xlsx';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 開發模式：載入 Vite 開發伺服器
  // 檢查是否為開發模式（透過環境變數或檢查是否已打包）
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生產模式：載入打包後的檔案
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('dialog:selectDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('fs:readDirectory', async (_, dirPath: string) => {
  try {
    const files: string[] = [];
    const ignoredFiles = ['.DS_Store', 'Thumbs.db', '.meta'];
    
    async function scanDirectory(currentPath: string) {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        // 忽略系統隱藏檔
        if (ignoredFiles.includes(entry.name)) {
          continue;
        }
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    }
    
    await scanDirectory(dirPath);
    return files;
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
});

// Excel 檔案處理 IPC Handlers
// 支援兩種方式：檔案路徑或檔案內容（ArrayBuffer）
ipcMain.handle('excel:parseHeaders', async (_, filePathOrBuffer: string | ArrayBuffer) => {
  try {
    let fileBuffer: Buffer;
    
    if (typeof filePathOrBuffer === 'string') {
      // 從檔案路徑讀取
      fileBuffer = await fs.readFile(filePathOrBuffer);
    } else {
      // 從 ArrayBuffer 轉換
      fileBuffer = Buffer.from(filePathOrBuffer);
    }
    
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // 讀取第一個工作表
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // 將工作表轉換為 JSON，只取第一行（標頭）
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = jsonData[0] as string[];
    
    return headers.filter((header) => header !== undefined && header !== null && header !== '');
  } catch (error) {
    console.error('Error parsing Excel headers:', error);
    throw error;
  }
});

ipcMain.handle('excel:readColumn', async (_, filePathOrBuffer: string | ArrayBuffer, columnName: string) => {
  try {
    let fileBuffer: Buffer;
    
    if (typeof filePathOrBuffer === 'string') {
      // 從檔案路徑讀取
      fileBuffer = await fs.readFile(filePathOrBuffer);
    } else {
      // 從 ArrayBuffer 轉換
      fileBuffer = Buffer.from(filePathOrBuffer);
    }
    
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // 讀取第一個工作表
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // 將工作表轉換為 JSON 陣列
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = jsonData[0] as string[];
    
    // 找到目標欄位的索引
    const columnIndex = headers.findIndex((h) => h === columnName);
    if (columnIndex === -1) {
      throw new Error(`Column "${columnName}" not found`);
    }
    
    // 提取該欄位的所有資料（跳過標頭）
    const columnData: string[] = [];
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i] as any[];
      const value = row[columnIndex];
      if (value !== undefined && value !== null && value !== '') {
        columnData.push(String(value).trim());
      }
    }
    
    return columnData;
  } catch (error) {
    console.error('Error reading Excel column:', error);
    throw error;
  }
});
