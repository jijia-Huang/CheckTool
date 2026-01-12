## 1. 建立比對觸發邏輯
- [x] 1.1 在 App.tsx 中實作比對觸發條件（當 fileNames 和 fileIndex 都準備好時）
- [x] 1.2 呼叫 `compareFileNames()` 執行批次比對
- [x] 1.3 處理比對結果並傳遞給結果顯示元件
- [x] 1.4 實作比對狀態管理（比對中、比對完成、比對失敗）

## 2. 建立結果列表元件
- [x] 2.1 建立 `src/components/ComparisonResultModule/ResultList.tsx`
- [x] 2.2 實作列表顯示（使用表格或列表元件）
- [x] 2.3 實作狀態圖示顯示（✅, ⚠️, ❌ 等）
- [x] 2.4 實作狀態顏色標示（綠色/橘色/紫色/紅色）
- [ ] 2.5 實作排序功能（可選：按狀態、檔名排序）
- [ ] 2.6 實作篩選功能（可選：只顯示錯誤項目）

## 3. 建立結果項目元件
- [x] 3.1 建立 `src/components/ComparisonResultModule/ResultItem.tsx`
- [x] 3.2 顯示規格檔名（Excel/貼上的原始資料）
- [x] 3.3 顯示檢測結果/備註（錯誤詳情或實際路徑）
- [x] 3.4 實作複製按鈕（複製檔名或路徑）
- [x] 3.5 實作點擊事件（觸發圖片預覽）

## 4. 建立圖片預覽元件
- [x] 4.1 建立 `src/components/ComparisonResultModule/ImagePreview.tsx`
- [x] 4.2 實作圖片載入（支援 PNG, JPG）
- [x] 4.3 實作圖片顯示（縮圖或完整大小）
- [x] 4.4 實作「無預覽圖」佔位符（當檔案缺失時）
- [x] 4.5 實作預覽視窗關閉功能
- [x] 4.6 處理圖片載入錯誤（檔案損壞、格式不支援等）

## 5. 建立結果統計元件
- [x] 5.1 建立 `src/components/ComparisonResultModule/ResultSummary.tsx`
- [x] 5.2 顯示比對結果摘要（總數、匹配數、錯誤數）
- [x] 5.3 顯示各狀態的數量統計（MATCH, NAMING_ERR, FORMAT_ERR, MISSING）
- [x] 5.4 實作視覺化統計（進度條或圓餅圖，可選）

## 6. 建立比對結果模組容器
- [x] 6.1 建立 `src/components/ComparisonResultModule/ComparisonResultModule.tsx`
- [x] 6.2 整合 ResultList、ImagePreview、ResultSummary 元件
- [x] 6.3 實作狀態管理（選取的項目、預覽狀態）
- [x] 6.4 實作「開始比對」按鈕（僅在輸入和檔案索引都準備好時啟用）

## 7. 整合到主應用
- [x] 7.1 更新 `src/App.tsx` 整合 ComparisonResultModule 元件
- [x] 7.2 實作比對觸發邏輯（當 fileNames 和 fileIndex 都準備好時自動觸發或提供按鈕）
- [x] 7.3 實作基本樣式（確保 UI 美觀易用）
- [x] 7.4 測試完整流程（從輸入到比對結果顯示）

## 8. 優化與改進
- [ ] 8.1 實作大量結果的虛擬滾動（可選，效能優化）
- [ ] 8.2 實作結果匯出功能（可選：匯出為 Excel 或 CSV）
- [ ] 8.3 實作結果搜尋功能（可選：搜尋檔名）
