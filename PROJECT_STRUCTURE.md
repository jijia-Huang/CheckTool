# 專案結構說明

## 目錄結構

```
CheckTool/
├── electron/                 # Electron 主程序
│   ├── main.ts              # 主程序入口（視窗管理、IPC 處理）
│   └── preload.ts           # 預載腳本（IPC 橋接，安全地暴露 API）
│
├── src/                     # React 應用程式碼
│   ├── components/          # React 元件（待實作）
│   ├── types/               # TypeScript 型別定義
│   │   └── index.ts         # 核心型別（FileStatus, ComparisonResult 等）
│   ├── utils/               # 工具函式
│   │   ├── excelParser.ts   # Excel 解析工具
│   │   ├── textParser.ts    # 文字貼上解析工具
│   │   └── fileComparator.ts # 檔案比對核心邏輯
│   ├── App.tsx              # 主應用元件
│   ├── App.css              # 應用樣式
│   ├── main.tsx             # React 入口點
│   ├── index.css            # 全域樣式
│   └── vite-env.d.ts        # Vite 環境型別定義
│
├── scripts/                 # 建置腳本
│   └── build-preload.js     # 建置 preload 腳本
│
├── openspec/                # OpenSpec 規格文件
│   ├── AGENTS.md            # AI 助手工作流程說明
│   ├── project.md           # 專案背景與技術規範
│   ├── changes/             # 變更提議
│   └── specs/               # 正式規格
│
├── dist/                    # Vite 建置輸出（React 應用）
├── dist-electron/           # Electron 主程序建置輸出
│   ├── main.js              # 編譯後的主程序
│   └── preload.js           # 編譯後的 preload 腳本
│
├── release/                 # 打包後的執行檔（electron-builder 輸出）
│
├── package.json             # 專案配置與依賴
├── tsconfig.json            # TypeScript 配置（React 應用）
├── tsconfig.electron.json   # TypeScript 配置（Electron 主程序）
├── tsconfig.node.json       # TypeScript 配置（Node.js 工具）
├── vite.config.ts           # Vite 建置配置
├── index.html               # HTML 入口
├── README.md                # 專案說明文件
└── .gitignore               # Git 忽略規則
```

## 核心模組說明

### Electron 主程序 (`electron/main.ts`)
- 管理應用程式視窗
- 處理 IPC 通訊（檔案系統操作、目錄選擇）
- 提供安全的 API 給渲染程序

### Preload 腳本 (`electron/preload.ts`)
- 在渲染程序中安全地暴露 Electron API
- 使用 `contextBridge` 建立 IPC 橋接

### React 應用 (`src/`)
- **components/**: UI 元件（待實作）
- **types/**: TypeScript 型別定義
- **utils/**: 核心業務邏輯
  - `excelParser.ts`: Excel 檔案解析
  - `textParser.ts`: 文字貼上解析
  - `fileComparator.ts`: 檔案比對邏輯

## 開發流程

1. **開發模式**: `npm run electron:dev`
   - 啟動 Vite 開發伺服器
   - 啟動 Electron 應用
   - 自動重新載入

2. **建置**: `npm run build`
   - 編譯 TypeScript
   - 建置 React 應用
   - 建置 Electron 主程序

3. **打包**: `npm run electron:build`
   - 執行完整建置
   - 使用 electron-builder 打包成執行檔

## 下一步

根據 `Spec.md` 的規格，需要實作以下功能模組：

1. **輸入模組** (`src/components/InputModule/`)
   - Excel 匯入元件
   - 文字貼上元件

2. **檔案系統模組** (`src/components/FileSystemModule/`)
   - 目錄選擇元件
   - 檔案掃描邏輯

3. **比對結果顯示** (`src/components/ResultDisplay/`)
   - 結果列表元件
   - 圖片預覽元件
