## Why
使用者需要執行檔名比對並查看比對結果。根據 `Spec.md` 的 3.3 和 3.4 節，系統需要整合比對核心邏輯（已實作在 `fileComparator.ts`）並提供結果顯示介面，包括狀態列表、錯誤詳情、圖片預覽等功能。這是整個工具的最後一步，必須在輸入模組和檔案系統模組完成後才能進行。

## What Changes
- **整合比對核心邏輯**：使用已實作的 `compareFileNames()` 函式執行批次比對
- **建立結果列表元件**：顯示比對結果，包含狀態圖示、檔名、錯誤訊息
- **實作狀態顏色標示**：根據比對狀態顯示對應顏色（綠色/橘色/紫色/紅色）
- **實作圖片預覽功能**：當使用者點擊列表項目時顯示圖片預覽（支援 PNG, JPG）
- **實作複製功能**：允許使用者複製檔名或路徑
- **實作結果統計**：顯示比對結果摘要（匹配數、錯誤數等）

## Impact
- **新增規格**: `specs/comparison-result-module/spec.md` - 定義比對與結果顯示的完整需求
- **新增程式碼**: 
  - `src/components/ComparisonResultModule/ComparisonResultModule.tsx` - 比對結果模組主元件
  - `src/components/ComparisonResultModule/ResultList.tsx` - 結果列表元件
  - `src/components/ComparisonResultModule/ResultItem.tsx` - 單一結果項目元件
  - `src/components/ComparisonResultModule/ImagePreview.tsx` - 圖片預覽元件
  - `src/components/ComparisonResultModule/ResultSummary.tsx` - 結果統計元件
- **修改程式碼**: 
  - `src/App.tsx` - 整合比對結果模組，觸發比對邏輯
- **使用現有程式碼**: 
  - `src/utils/fileComparator.ts` - 使用已實作的比對函式
  - `src/types/index.ts` - 使用已定義的型別
- **無破壞性變更**: 此為新功能，不影響現有程式碼
