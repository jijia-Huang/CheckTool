import './FileSystemModule.css';

interface ScanProgressProps {
  isScanning: boolean;
  fileCount: number;
  currentPath?: string;
}

export default function ScanProgress({ isScanning, fileCount, currentPath }: ScanProgressProps) {
  if (!isScanning) {
    return null;
  }

  return (
    <div className="scan-progress">
      <div className="progress-content">
        <div className="spinner"></div>
        <div className="progress-info">
          <p className="progress-text">掃描中...</p>
          <p className="file-count">已找到 {fileCount} 個檔案</p>
          {currentPath && (
            <p className="current-path">目前路徑：{currentPath}</p>
          )}
        </div>
      </div>
    </div>
  );
}
