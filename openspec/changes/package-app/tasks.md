## 1. 環境準備與配置優化
- [x] 1.1 檢查 `vite.config.ts` 確保 `base: './'` 以支援 `file://` 協議。
- [x] 1.2 更新 `package.json` 中的 `scripts`，將打包流程標準化。
- [x] 1.3 完善 `package.json` 的 `build` 欄位（appId, copyright, nsis 設定）。

## 2. 應用程式圖示 (Icon)
- [ ] 2.1 準備或生成 `build/icon.ico` 檔案。
- [ ] 2.2 確保圖示包含多種尺寸 (16x16, 32x32, 48x48, 64x64, 128x128, 256x256)。

## 3. 執行打包流程
- [ ] 3.1 執行 `npm run electron:build` 進行完整建置。
- [ ] 3.2 檢查 `dist` 與 `dist-electron` 是否包含最新程式碼。
- [ ] 3.3 驗證產生的 EXE 安裝程式是否能正常開啟與執行功能。

## 4. 交付與說明
- [ ] 4.1 確認安裝後的資料夾結構正確。
- [ ] 4.2 提供簡易的執行說明給企劃人員。
