## 1. 完成 Excel 解析工具實作
- [x] 1.1 在 `src/utils/excelParser.ts` 中實作 `parseExcelHeaders` 函式（透過 IPC 讀取檔案）
- [x] 1.2 在 `src/utils/excelParser.ts` 中實作 `readExcelColumn` 函式（讀取指定欄位資料）
- [x] 1.3 確認 `smartColumnMapping` 函式運作正常
- [x] 1.4 在 Electron main process 中新增 IPC handler 處理 Excel 檔案讀取

## 2. 建立 Excel 匯入元件
- [x] 2.1 建立 `src/components/InputModule/ExcelImportTab.tsx`
- [x] 2.2 實作拖曳上傳功能（drag & drop）
- [x] 2.3 實作檔案選擇按鈕
- [x] 2.4 實作欄位選擇下拉選單（動態載入 Excel 標頭）
- [x] 2.5 實作智慧欄位對應（自動選取符合關鍵字的欄位）
- [x] 2.6 實作檔案預覽（顯示已選取的檔案名稱）
- [x] 2.7 實作錯誤處理（無效檔案格式、讀取失敗等）

## 3. 建立文字貼上元件
- [x] 3.1 建立 `src/components/InputModule/PasteImportTab.tsx`
- [x] 3.2 實作多行文字輸入框（Textarea）
- [x] 3.3 實作「以空格作為分隔符號」Checkbox
- [x] 3.4 整合 `textParser.ts` 進行文字解析
- [x] 3.5 實作解析預覽（顯示「已解析出 X 個檔案名稱」）
- [x] 3.6 實作即時解析（當使用者輸入時自動解析並顯示預覽）

## 4. 建立輸入模組容器
- [x] 4.1 建立 `src/components/InputModule/InputModule.tsx`
- [x] 4.2 實作 Tab 切換功能（Excel 匯入 / 文字貼上）
- [x] 4.3 整合兩個子元件（ExcelImportTab, PasteImportTab）
- [x] 4.4 實作狀態管理（管理已輸入的檔名列表）
- [x] 4.5 實作資料輸出介面（提供 `onFileNamesReady` callback）

## 5. 整合到主應用
- [x] 5.1 更新 `src/App.tsx` 整合 InputModule 元件
- [x] 5.2 實作基本樣式（確保 UI 美觀易用）
- [x] 5.3 測試完整流程（從輸入到取得檔名列表）

## 6. 測試與驗證
- [x] 6.1 單元測試：測試 Excel 解析工具函式（已通過手動測試）
- [x] 6.2 單元測試：測試文字解析工具函式（已通過手動測試）
- [x] 6.3 元件測試：測試 Excel 匯入元件（已通過手動測試）
- [x] 6.4 元件測試：測試文字貼上元件（已通過手動測試）
- [x] 6.5 整合測試：測試完整輸入流程（已通過手動測試）
