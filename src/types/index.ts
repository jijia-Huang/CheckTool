// 檔案比對狀態
export enum FileStatus {
  MATCH = 'MATCH',           // 完全匹配
  NAMING_ERR = 'NAMING_ERR', // 大小寫錯誤
  FORMAT_ERR = 'FORMAT_ERR', // 副檔名錯誤
  MISSING = 'MISSING',       // 漏檔
}

// 比對結果
export interface ComparisonResult {
  expectedName: string;      // 規格中的檔名
  status: FileStatus;        // 比對狀態
  actualPath?: string;       // 實際檔案路徑（如果找到）
  errorMessage?: string;     // 錯誤訊息
}

// Excel 匯入選項
export interface ExcelImportOptions {
  filePath: string;
  columnName: string;        // 選取的欄位名稱
}

// 文字貼上選項
export interface PasteImportOptions {
  text: string;
  useSpaceAsDelimiter: boolean;
}
