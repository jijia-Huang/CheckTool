/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    selectDirectory: () => Promise<string | null>;
    readDirectory: (dirPath: string) => Promise<string[]>;
    parseExcelHeaders: (filePathOrBuffer: string | ArrayBuffer) => Promise<string[]>;
    readExcelColumn: (filePathOrBuffer: string | ArrayBuffer, columnName: string) => Promise<string[]>;
  };
}
