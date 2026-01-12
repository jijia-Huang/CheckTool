## Why
使用者需要能夠輸入「企劃規格列表」來進行檔案比對。根據 `Spec.md` 的 3.1 節，系統需要支援兩種輸入方式：Excel 檔案匯入與文字貼上模式。這是整個工具的第一步，必須先完成才能進行後續的檔案比對功能。

## What Changes
- **新增輸入模組 UI 元件**：建立包含兩個 Tab 的輸入介面（Excel 匯入 / 文字貼上）
- **實作 Excel 匯入功能**：支援 `.xlsx`, `.xls`, `.csv` 格式，包含拖曳上傳、欄位選擇、智慧欄位對應
- **實作文字貼上功能**：支援多種分隔符號解析、資料清洗、預覽功能
- **整合現有工具函式**：使用已實作的 `textParser.ts`，並完成 `excelParser.ts` 的實作
- **建立 React 元件結構**：在 `src/components/InputModule/` 下建立相關元件

## Impact
- **新增規格**: `specs/input-module/spec.md` - 定義輸入模組的完整需求
- **新增程式碼**: 
  - `src/components/InputModule/ExcelImportTab.tsx` - Excel 匯入元件
  - `src/components/InputModule/PasteImportTab.tsx` - 文字貼上元件
  - `src/components/InputModule/InputModule.tsx` - 主輸入模組容器
  - 更新 `src/utils/excelParser.ts` - 完成 Excel 解析實作
- **修改程式碼**: 
  - `src/App.tsx` - 整合輸入模組到主應用
- **無破壞性變更**: 此為新功能，不影響現有程式碼
