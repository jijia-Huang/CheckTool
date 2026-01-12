# Project Context

## Purpose
**美術回檔確認工具 (Art Asset Verification Tool)**
開發一款桌面端工具，供企劃人員 (Spec owner) 使用。用於比對「企劃規格列表」（Excel 或 貼上清單）與「美術交付檔案目錄」，快速檢測漏檔、錯名、格式錯誤等問題，降低溝通成本。

## Tech Stack
採用 **Electron + React/TypeScript** 技術棧：

- **前端框架**: React 18+ with TypeScript
- **桌面框架**: Electron (最新穩定版)
- **Excel 處理**: `xlsx` (SheetJS) - 支援 `.xlsx`, `.xls`, `.csv` 格式
- **檔案系統**: Node.js `fs` API (透過 Electron 的 `ipcMain`/`ipcRenderer`)
- **UI 元件庫**: 待定（可選：Ant Design, Material-UI, 或自訂樣式）
- **打包工具**: `electron-builder` 或 `electron-forge` (產生 Windows/macOS 執行檔)
- **建置工具**: Vite 或 Webpack (建議 Vite 以獲得更好的開發體驗)

### Excel 處理方案評估
**建議：使用純 JavaScript/TypeScript 方案（`xlsx` 庫）**

**優點**：
- ✅ 統一技術棧，減少複雜度
- ✅ 不需要額外的 Python 環境或 IPC 通信
- ✅ 對於讀取 Excel、解析標頭、欄位選擇的需求，`xlsx` 庫完全足夠
- ✅ 打包和部署更簡單（單一執行檔）
- ✅ 效能對 1000+ 筆資料的讀取需求足夠

**Python 方案的考量**：
- ⚠️ 需要額外的 IPC (Inter-Process Communication) 機制
- ⚠️ 增加打包複雜度（需要打包 Python 執行環境）
- ⚠️ 僅在需要複雜資料分析（如 pandas 的進階功能）時才有優勢
- ✅ 若未來需要複雜的資料處理，可考慮透過 `child_process` 呼叫 Python 腳本

**結論**：目前階段建議使用 `xlsx` (SheetJS)，若未來有複雜資料分析需求再評估引入 Python。

## Project Conventions

### Code Style
- **TypeScript**: 遵循 TypeScript 官方風格指南，啟用嚴格模式 (`strict: true`)
- **React**: 使用函式元件 (Functional Components) 與 Hooks
- **命名規範**: 
  - 變數與函式使用 `camelCase`
  - 類別與元件使用 `PascalCase`
  - 常數使用 `UPPER_SNAKE_CASE`
- **檔案命名**: 元件檔案使用 `PascalCase.tsx`，工具函式使用 `camelCase.ts`
- **文件**: 使用繁體中文進行說明文件撰寫

### Architecture Patterns
- **元件化架構**: 使用 React 元件將 UI 模組化（Input Module, File System Module, Comparison Logic, Result Display）
- **狀態管理**: 使用 React Context API 或 Zustand（若狀態複雜度增加）管理全域狀態
- **非同步處理**: 
  - 檔案掃描與比對使用 `Web Workers` 或 Electron 的 `ipcMain` 在背景執行
  - 使用 `async/await` 與 Promise 處理非同步操作
  - UI 顯示 Loading 狀態，避免卡死
- **Electron 架構**: 
  - Main Process: 處理檔案系統操作（透過 `electron.dialog` 選擇目錄）
  - Renderer Process: React UI 與使用者互動
  - IPC: 使用 `ipcMain`/`ipcRenderer` 進行主程序與渲染程序間的通訊

### Testing Strategy
- **單元測試**: 
  - 使用 `Vitest` 或 `Jest` 測試檔案比對核心邏輯 (Comparison Logic)
  - 測試 Excel 解析與文字貼上模式的解析正確性
- **元件測試**: 使用 `React Testing Library` 測試 UI 元件
- **整合測試**: 測試 Electron IPC 通訊與檔案系統操作

### Git Workflow
- 使用簡潔的提交訊息，如 `feat:`, `fix:`, `docs:`, `refactor:`。

## Domain Context
- **企劃規格 (Spec)**: 通常包含檔名、描述、路徑需求等。
- **美術資產 (Assets)**: 包含 `.png`, `.jpg`, `.meta`, `.spine` 等遊戲開發常用檔案。
- **大小寫敏感度**: 在 Windows 下檔案系統不區分大小寫，但遊戲引擎 (如 Unity/Unreal) 或跨平台運行時可能會有影響，因此工具需特別標註命名大小寫差異。

## Important Constraints
- **Windows 支援**: 必須能在 Windows 環境流暢執行。
- **效能**: 需支援 1000 筆以上資料的即時比對與顯示。

## External Dependencies
### 核心依賴
- `electron` - 桌面應用框架
- `react`, `react-dom` - UI 框架
- `typescript` - 型別系統
- `xlsx` (SheetJS) - Excel/CSV 檔案處理

### 開發依賴
- `vite` 或 `webpack` - 建置工具
- `electron-builder` 或 `electron-forge` - 打包工具
- `vitest` 或 `jest` - 測試框架
- `@testing-library/react` - React 元件測試

### 可選依賴
- UI 元件庫（如 `antd`, `@mui/material`）
- 狀態管理（如 `zustand`, `jotai`）
