# 專案規格書：美術回檔確認工具 (Art Asset Verification Tool)

這是一份完整的 **「美術回檔確認工具 (Art Asset Verification Tool)」** 規格書。本文檔整合成工程師可以直接開發的格式，包含 Excel 讀取、智慧文字貼上、容錯邏輯與 UI 呈現要求。

---

## 1. 專案目的
開發一款桌面端工具，供企劃人員 (Spec owner) 使用。用於比對 **「企劃規格列表」** 與 **「美術交付檔案目錄」**，快速檢測漏檔、錯名、格式錯誤等問題，降低溝通成本。

---

## 2. 使用者流程 (User Flow)
1. **輸入規格**：使用者選擇匯入 Excel 或直接貼上檔名清單。
2. **選擇目錄**：使用者選擇美術提供的資產根目錄 (Root Folder)。
3. **執行檢查**：系統遍歷目錄並與規格清單進行比對。
4. **查看結果**：列表顯示比對結果（OK / 漏檔 / 錯誤），並提供圖片預覽功能。

---

## 3. 功能模組規格 (Functional Requirements)

### 3.1. 輸入模組 (Input Module)
UI 需提供兩種模式切換（Tabs）：

#### A. 檔案匯入模式 (File Import Mode)
- **支援格式**：`.xlsx`, `.xls`, `.csv`。
- **操作**：支援拖曳檔案或點擊按鈕選擇。
- **欄位對應 (Mapping)**：
    - 解析檔案標頭 (Header)。
    - 提供下拉選單讓使用者選擇 「檔名欄位 (Required)」。
    - **Smart Mapping**: 若標頭包含 `Name`, `File`, `Asset`, `檔名` 等關鍵字，自動選取該欄位。

#### B. 智慧貼上模式 (Quick Paste Mode)
- **操作**：提供多行文字輸入框 (Textarea)。
- **解析邏輯 (Parsing Logic)**：
    - **主要分隔符號**：換行符 (`\n`, `\r`)、逗號 (`,`)、分號 (`;`)、Tab (`\t`)。
    - **空白處理**：預設不將「單純空格」視為分隔符（以相容帶空格的檔名）。
    - **UI 選項**：增加 Checkbox `[ ] 以空格作為分隔符號` (預設關閉)。
- **資料清洗 (Cleaning)**：
    - 自動去除前後空白 (Trim)。
    - 自動去除引號 (`'`, `"`)。
    - 過濾空字串。
- **預覽功能**：在執行檢查前，顯示「已解析出 X 個檔案名稱」，供使用者確認。

### 3.2. 檔案系統模組 (File System Module)
- **目錄選擇**：選擇本地資料夾路徑。
- **遞迴搜尋 (Recursive Scan)**：必須搜尋根目錄及其所有子目錄。
- **忽略規則**：自動忽略系統隱藏檔（如 `.DS_Store`, `Thumbs.db`, `.meta`）。
- **索引建立**：建立一個 `{ "lowercase_filename": "full_path" }` 的雜湊表 (Hash Map) 以加速比對。

### 3.3. 比對核心邏輯 (Comparison Logic)
針對每一個「規格中的檔名 (Expected Name)」，判斷狀態並賦予對應顏色：

| 狀態 (Status) | 判定條件 | UI 建議顏色 | 錯誤訊息範例 |
| :--- | :--- | :--- | :--- |
| **MATCH** | 檔名與副檔名完全一致 (Case-sensitive) | 🟢 綠色 | OK |
| **NAMING_ERR** | 找到檔名相同但「大小寫不一致」 | 🟠 橘色 | [大小寫錯誤] 實檔為: Icon_Sword.png |
| **FORMAT_ERR** | 找到主檔名相同，但「副檔名不一致」 | 🟣 紫色 | [格式錯誤] 實檔為: icon_sword.jpg |
| **MISSING** | 檔案目錄中完全找不到該檔名 | 🔴 紅色 | [漏檔] 找不到檔案 |

*註：比對優先順序為 Match > Naming_Err > Format_Err > Missing。*

### 3.4. 結果顯示與互動 (UI/UX)
- **主要列表 (Data Grid)**：
    - 狀態圖示 (❌, ⚠️, ✅)
    - 規格檔名 (Excel/貼上的原始資料)
    - 檢測結果/備註 (顯示錯誤詳情或實際路徑)
    - 操作：複製按鈕 (Copy Name/Path)
- **預覽視窗 (Preview Panel)**：
    - 當使用者點擊列表項目時，若檔案存在則顯示圖片預覽 (支援 PNG, JPG)。
    - 若檔案缺失，則顯示「無預覽圖」佔位符。

---

## 4. 非功能性需求 (Non-Functional Requirements)
- **平台支援**：Windows (優先), macOS。
- **效能要求**：支援比對 1000+ 筆資料，UI 不可卡死（建議使用非同步處理與 Loading Bar）。
- **開發建議技術棧**：
    - **Python**: 使用 `pandas` 處理 Excel，`os.walk` 處理檔案，`PyQt` 或 `Tkinter` 製作 GUI。
    - **Electron**: 若希望介面更現代化，可使用 Web 技術包裝。