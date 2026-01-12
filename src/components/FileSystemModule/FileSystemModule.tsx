import { useState, useCallback } from 'react';
import DirectorySelector from './DirectorySelector';
import ScanProgress from './ScanProgress';
import { buildFileIndex } from '../../utils/fileComparator';
import './FileSystemModule.css';

interface FileSystemModuleProps {
  onFileIndexReady: (fileIndex: Map<string, string>) => void;
}

export default function FileSystemModule({ onFileIndexReady }: FileSystemModuleProps) {
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [fileIndex, setFileIndex] = useState<Map<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanSummary, setScanSummary] = useState<{ totalFiles: number; scanTime: number } | null>(null);

  const handleDirectorySelected = useCallback((dirPath: string) => {
    setSelectedDirectory(dirPath);
    setFileIndex(null);
    setScanSummary(null);
    setError(null);
  }, []);

  const handleStartScan = useCallback(async () => {
    if (!selectedDirectory || !window.electronAPI) {
      setError('請先選擇目錄');
      return;
    }

    setIsScanning(true);
    setError(null);
    setFileCount(0);
    setFileIndex(null);
    setScanSummary(null);

    const startTime = Date.now();

    try {
      // 呼叫 IPC 進行遞迴掃描
      const filePaths = await window.electronAPI.readDirectory(selectedDirectory);
      
      // 更新檔案數量
      setFileCount(filePaths.length);

      // 建立檔案索引
      const index = buildFileIndex(filePaths);
      setFileIndex(index);

      // 計算掃描時間
      const scanTime = Date.now() - startTime;
      setScanSummary({
        totalFiles: filePaths.length,
        scanTime,
      });

      // 通知父元件
      onFileIndexReady(index);
    } catch (err) {
      setError(err instanceof Error ? err.message : '掃描目錄失敗');
      console.error('Error scanning directory:', err);
    } finally {
      setIsScanning(false);
    }
  }, [selectedDirectory, onFileIndexReady]);

  return (
    <div className="file-system-module">
      <h2>選擇美術資產目錄</h2>

      <DirectorySelector onDirectorySelected={handleDirectorySelected} />

      {selectedDirectory && !isScanning && !fileIndex && (
        <div className="scan-controls">
          <button
            className="start-scan-button"
            onClick={handleStartScan}
            disabled={!selectedDirectory}
          >
            開始掃描
          </button>
        </div>
      )}

      <ScanProgress
        isScanning={isScanning}
        fileCount={fileCount}
      />

      {error && (
        <div className="error-message">{error}</div>
      )}

      {scanSummary && fileIndex && (
        <div className="scan-summary">
          <p className="summary-title">掃描完成</p>
          <p className="summary-detail">
            共找到 <strong>{scanSummary.totalFiles}</strong> 個檔案
            {scanSummary.scanTime > 0 && (
              <span>（耗時 {scanSummary.scanTime}ms）</span>
            )}
          </p>
          <p className="summary-detail">
            已建立檔案索引，準備進行比對
          </p>
        </div>
      )}
    </div>
  );
}
