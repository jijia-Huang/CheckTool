## Why
為了讓企劃人員能夠在沒有開發環境的情況下直接執行「美術回檔確認工具」，需要將專案打包成 Windows 可執行檔 (.exe)。這將包含所有必要的依賴、圖示以及簡易的安裝程序，提升工具的發布效率與易用性。

## What Changes
- **配置 `electron-builder`**：完善 `package.json` 中的 `build` 配置，確保資源路徑正確且支援 ASAR 加密以提升安全性與效能。
- **建立應用程式圖示**：建立 `build/icon.ico`（Windows）以取代預設的 Electron 圖示。
- **優化建置腳本**：修正 `package.json` 中的 `build` 腳本，確保渲染程序與主程序都能正確編譯。
- **產生安裝程式 (NSIS)**：設定 NSIS 安裝程式，支援一鍵安裝與桌面捷徑。

## Impact
- **修改程式碼**: 
  - `package.json` - 更新 `scripts` 與 `build` 配置。
  - `vite.config.ts` - 確保 `base` 路徑為 `./`（相對路徑）。
- **新增檔案**: 
  - `build/icon.ico` - 應用程式圖示（需準備檔案）。
- **發布物**:
  - `release/美術回檔確認工具 Setup 0.1.0.exe` - 最終交付給企劃的安裝檔。
