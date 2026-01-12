## Why
使用者需要選擇美術資產目錄並掃描其中的檔案，以便與輸入的規格列表進行比對。根據 `Spec.md` 的 3.2 節，系統需要提供目錄選擇功能、遞迴搜尋、忽略系統檔案，並建立檔案索引以加速後續比對。這是整個工具流程的第二步，必須在輸入模組完成後才能進行。

## What Changes
- **新增檔案系統模組 UI 元件**：建立目錄選擇與掃描進度顯示介面
- **實作目錄選擇功能**：使用 Electron dialog API 選擇本地資料夾
- **實作遞迴檔案掃描**：使用已存在的 IPC handler 掃描目錄及其所有子目錄
- **實作檔案索引建立**：使用 `fileComparator.ts` 中的 `buildFileIndex` 函式建立索引
- **實作進度顯示**：顯示掃描進度（檔案數量、目前掃描路徑）
- **整合現有 IPC 功能**：使用已實作的 `selectDirectory` 和 `readDirectory` IPC handlers

## Impact
- **新增規格**: `specs/file-system-module/spec.md` - 定義檔案系統模組的完整需求
- **新增程式碼**: 
  - `src/components/FileSystemModule/FileSystemModule.tsx` - 檔案系統模組主元件
  - `src/components/FileSystemModule/DirectorySelector.tsx` - 目錄選擇元件
  - `src/components/FileSystemModule/ScanProgress.tsx` - 掃描進度顯示元件
- **修改程式碼**: 
  - `src/App.tsx` - 整合檔案系統模組到主應用
  - 可能需要更新 `electron/main.ts` 以支援進度回報（可選）
- **無破壞性變更**: 此為新功能，不影響現有程式碼
