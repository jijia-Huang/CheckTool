/**
 * 解析 Excel 檔案並取得所有欄位名稱
 * 透過 Electron IPC 呼叫主程序處理
 * 支援檔案路徑（string）或檔案內容（ArrayBuffer）
 */
export function parseExcelHeaders(filePathOrBuffer: string | ArrayBuffer): Promise<string[]> {
  if (!window.electronAPI) {
    return Promise.reject(new Error('Electron API not available'));
  }
  return window.electronAPI.parseExcelHeaders(filePathOrBuffer);
}

/**
 * 從 Excel 檔案中讀取指定欄位的資料
 * 透過 Electron IPC 呼叫主程序處理
 * 支援檔案路徑（string）或檔案內容（ArrayBuffer）
 */
export function readExcelColumn(
  filePathOrBuffer: string | ArrayBuffer,
  columnName: string
): Promise<string[]> {
  if (!window.electronAPI) {
    return Promise.reject(new Error('Electron API not available'));
  }
  return window.electronAPI.readExcelColumn(filePathOrBuffer, columnName);
}

/**
 * 智慧欄位對應：根據關鍵字自動選取欄位
 */
export function smartColumnMapping(headers: string[]): string | null {
  const keywords = ['Name', 'File', 'Asset', '檔名', '檔案名稱', 'filename'];
  
  for (const header of headers) {
    const lowerHeader = header.toLowerCase();
    if (keywords.some(keyword => lowerHeader.includes(keyword.toLowerCase()))) {
      return header;
    }
  }
  
  return headers.length > 0 ? headers[0] : null;
}
