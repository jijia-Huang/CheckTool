## Why
目前的 UI 介面較為陽春，且部分配色存在對比度不足的問題（文字與背景重疊或顏色過於接近），導致閱讀困難。此外，使用者在輸入規格後無法直觀地查看解析出的具體檔名，且比對結果列表缺乏有效的過濾機制，使用者難以快速定位特定狀態的檔案（如：只想看「漏檔」的項目）。

## What Changes
- **優化整體配色與風格**：定義一組現代、清晰且高對比度的色彩規範，統一深色/淺色模式的表現。
- **新增輸入預覽區塊**：在輸入模組下方新增一個可折疊或滾動的區域，顯示目前已解析出的具體檔名列表。
- **實作結果過濾功能**：
  - 點擊結果摘要中的狀態項目（如「漏檔：5」）時，自動過濾下方的列表僅顯示該狀態的檔案。
  - 新增「顯示全部」按鈕以重置過濾器。
  - 新增「顯示所有匹配」按鈕。
- **改進佈局與間距**：調整元件間的間距與對齊，確保文字清晰且不會與背景元素衝突。

## Impact
- **新增規格**: `specs/ui-ux-improvement/spec.md` - 定義 UI 規範與過濾邏輯需求。
- **修改程式碼**: 
  - `src/index.css`, `src/App.css` - 統一色彩規範與基本樣式。
  - `src/components/InputModule/InputModule.tsx` - 新增檔名清單顯示區。
  - `src/components/ComparisonResultModule/ComparisonResultModule.tsx` - 實作過濾邏輯。
  - `src/components/ComparisonResultModule/ResultSummary.tsx` - 加入點擊事件以觸發過濾。
  - `src/components/ComparisonResultModule/ResultList.tsx` - 配合過濾邏輯更新顯示。
- **無破壞性變更**: 現有功能邏輯保持不變，僅調整顯示與互動方式。
