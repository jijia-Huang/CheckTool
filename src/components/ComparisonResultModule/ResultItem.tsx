import { ComparisonResult, FileStatus } from '../../types';
import './ComparisonResultModule.css';

interface ResultItemProps {
  result: ComparisonResult;
  onItemClick: (result: ComparisonResult) => void;
}

export default function ResultItem({ result, onItemClick }: ResultItemProps) {
  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case FileStatus.MATCH:
        return '✅';
      case FileStatus.NAMING_ERR:
      case FileStatus.FORMAT_ERR:
        return '⚠️';
      case FileStatus.MISSING:
        return '❌';
      default:
        return '❓';
    }
  };

  const getStatusColor = (status: FileStatus) => {
    switch (status) {
      case FileStatus.MATCH:
        return 'status-match';
      case FileStatus.NAMING_ERR:
        return 'status-naming-err';
      case FileStatus.FORMAT_ERR:
        return 'status-format-err';
      case FileStatus.MISSING:
        return 'status-missing';
      default:
        return '';
    }
  };

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      // 可以加入 toast 通知，這裡先簡單處理
      alert('已複製到剪貼簿');
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div
      className={`result-item ${getStatusColor(result.status)}`}
      onClick={() => onItemClick(result)}
    >
      <div className="result-status">
        <span className="status-icon">{getStatusIcon(result.status)}</span>
      </div>
      
      <div className="result-content">
        <div className="result-filename">
          <strong>{result.expectedName}</strong>
        </div>
        <div className="result-message">
          {result.status === FileStatus.MATCH ? (
            <span className="match-message">OK</span>
          ) : (
            <span className="error-message">{result.errorMessage}</span>
          )}
          {result.actualPath && (
            <span className="actual-path">{result.actualPath}</span>
          )}
        </div>
      </div>

      <div className="result-actions">
        <button
          className="copy-button"
          onClick={(e) => handleCopy(e, result.expectedName)}
          title="複製檔名"
        >
          📋
        </button>
        {result.actualPath && (
          <button
            className="copy-button"
            onClick={(e) => handleCopy(e, result.actualPath!)}
            title="複製路徑"
          >
            📁
          </button>
        )}
      </div>
    </div>
  );
}
