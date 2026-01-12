# 美術回檔確認工具 (Art Asset Verification Tool)

一款桌面端工具，用於比對「企劃規格列表」與「美術交付檔案目錄」，快速檢測漏檔、錯名、格式錯誤等問題。

## 技術棧

- **Electron** - 桌面應用框架
- **React 18** - UI 框架
- **TypeScript** - 型別系統
- **Vite** - 建置工具
- **xlsx (SheetJS)** - Excel/CSV 檔案處理

## 開發

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run electron:dev
```

這會同時啟動 Vite 開發伺服器與 Electron 應用。

### 建置

```bash
npm run build
```

### 打包應用

```bash
npm run electron:build
```

打包後的檔案會輸出到 `release/` 目錄。

## 專案結構

```
CheckTool/
├── electron/          # Electron 主程序
│   ├── main.ts       # 主程序入口
│   └── preload.ts    # 預載腳本（IPC 橋接）
├── src/              # React 應用
│   ├── components/   # React 元件
│   ├── utils/        # 工具函式
│   ├── types/        # TypeScript 型別定義
│   ├── App.tsx       # 主應用元件
│   └── main.tsx      # React 入口
├── openspec/         # OpenSpec 規格文件
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 功能模組（規劃中）

- [ ] 輸入模組（Excel 匯入 / 文字貼上）
- [ ] 檔案系統模組（目錄選擇與掃描）
- [ ] 比對核心邏輯（檔名比對與狀態判斷）
- [ ] 結果顯示與互動（列表顯示與圖片預覽）

## 授權

MIT
