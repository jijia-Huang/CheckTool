import { useState, useCallback } from 'react';
import { parseExcelHeaders, readExcelColumn, smartColumnMapping } from '../../utils/excelParser';
import './InputModule.css';

interface ExcelImportTabProps {
  onFileNamesReady: (fileNames: string[]) => void;
}

export default function ExcelImportTab({ onFileNamesReady }: ExcelImportTabProps) {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 處理欄位選擇
  const handleColumnSelect = useCallback(async (columnName: string, bufferToUse?: ArrayBuffer) => {
    const buffer = bufferToUse || fileBuffer;
    if (!buffer || !columnName) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await readExcelColumn(buffer, columnName);
      setFileNames(data);
      onFileNamesReady(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '讀取欄位資料失敗');
      console.error('Error reading column:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fileBuffer, onFileNamesReady]);

  // 處理檔案選擇
  const handleFileSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setHeaders([]);
    setSelectedColumn('');
    setFileNames([]);

    // 檢查檔案格式
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setError('不支援的檔案格式。請選擇 .xlsx, .xls 或 .csv 檔案。');
      setIsLoading(false);
      return;
    }

    try {
      // 讀取檔案內容為 ArrayBuffer，透過 IPC 傳送給主程序處理
      const arrayBuffer = await file.arrayBuffer();
      setFileBuffer(arrayBuffer);
      
      // 儲存檔案名稱供顯示用
      setFilePath(file.name);
      
      // 解析標頭
      const parsedHeaders = await parseExcelHeaders(arrayBuffer);
      setHeaders(parsedHeaders);

      // 智慧欄位對應
      const smartColumn = smartColumnMapping(parsedHeaders);
      if (smartColumn) {
        setSelectedColumn(smartColumn);
        // 自動讀取該欄位
        await handleColumnSelect(smartColumn, arrayBuffer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '讀取檔案失敗');
      console.error('Error reading Excel file:', err);
    } finally {
      setIsLoading(false);
    }
  }, [handleColumnSelect]);

  // 拖曳處理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // 檔案選擇按鈕處理
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // 當選取的欄位改變時，重新讀取資料
  const handleColumnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const columnName = e.target.value;
    setSelectedColumn(columnName);
    if (columnName) {
      handleColumnSelect(columnName);
    }
  }, [handleColumnSelect]);

  return (
    <div className="excel-import-tab">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>拖曳 Excel 檔案到此處，或</p>
        <label className="file-select-button">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          選擇檔案
        </label>
        {filePath && (
          <p className="file-name">已選取：{filePath}</p>
        )}
      </div>

      {isLoading && (
        <div className="loading">讀取中...</div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {headers.length > 0 && (
        <div className="column-selector">
          <label htmlFor="column-select">選擇檔名欄位：</label>
          <select
            id="column-select"
            value={selectedColumn}
            onChange={handleColumnChange}
            disabled={isLoading}
          >
            <option value="">-- 請選擇欄位 --</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
      )}

      {fileNames.length > 0 && (
        <div className="preview">
          <p className="preview-count">已解析出 {fileNames.length} 個檔案名稱</p>
        </div>
      )}
    </div>
  );
}
