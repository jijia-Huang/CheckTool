## 1. 建立目錄選擇元件
- [x] 1.1 建立 `src/components/FileSystemModule/DirectorySelector.tsx`
- [x] 1.2 實作「選擇目錄」按鈕，呼叫 `window.electronAPI.selectDirectory()`
- [x] 1.3 顯示已選取的目錄路徑
- [x] 1.4 實作錯誤處理（使用者取消選擇、權限不足等）

## 2. 建立掃描進度顯示元件
- [x] 2.1 建立 `src/components/FileSystemModule/ScanProgress.tsx`
- [x] 2.2 實作載入動畫或進度條
- [x] 2.3 顯示目前掃描的檔案數量
- [x] 2.4 顯示目前掃描的路徑（可選，避免過度更新 UI）
- [x] 2.5 實作掃描完成提示

## 3. 實作檔案掃描邏輯
- [x] 3.1 在 FileSystemModule 中實作掃描觸發邏輯
- [x] 3.2 呼叫 `window.electronAPI.readDirectory()` 進行遞迴掃描
- [x] 3.3 使用 `buildFileIndex()` 建立檔案索引（小寫檔名 -> 完整路徑）
- [x] 3.4 實作非同步處理，避免 UI 卡死
- [x] 3.5 實作錯誤處理（目錄不存在、權限不足等）

## 4. 建立檔案系統模組容器
- [x] 4.1 建立 `src/components/FileSystemModule/FileSystemModule.tsx`
- [x] 4.2 整合 DirectorySelector 和 ScanProgress 元件
- [x] 4.3 實作狀態管理（選取的目錄、掃描狀態、檔案索引）
- [x] 4.4 實作資料輸出介面（提供 `onFileIndexReady` callback）
- [x] 4.5 實作「開始掃描」按鈕（僅在選取目錄後啟用）

## 5. 整合到主應用
- [x] 5.1 更新 `src/App.tsx` 整合 FileSystemModule 元件
- [x] 5.2 實作基本樣式（確保 UI 美觀易用）
- [x] 5.3 確保輸入模組與檔案系統模組的資料流暢通
- [x] 5.4 測試完整流程（從輸入到檔案索引建立）

## 6. 優化與改進
- [ ] 6.1 實作掃描取消功能（可選，未來改進）
- [x] 6.2 優化大量檔案的掃描效能（已使用非同步處理，避免 UI 卡死）
- [x] 6.3 實作掃描結果摘要（總檔案數、掃描時間等）
