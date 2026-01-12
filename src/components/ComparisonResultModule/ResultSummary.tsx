import { ComparisonResult, FileStatus } from '../../types';
import './ComparisonResultModule.css';

interface ResultSummaryProps {
  results: ComparisonResult[];
  activeFilter: FileStatus | 'ALL' | 'MATCHES' | 'ERRORS';
  onFilterChange: (status: FileStatus | 'ALL' | 'MATCHES' | 'ERRORS') => void;
}

export default function ResultSummary({ results, activeFilter, onFilterChange }: ResultSummaryProps) {
  const total = results.length;
  const matchCount = results.filter(r => r.status === FileStatus.MATCH).length;
  const namingErrCount = results.filter(r => r.status === FileStatus.NAMING_ERR).length;
  const formatErrCount = results.filter(r => r.status === FileStatus.FORMAT_ERR).length;
  const missingCount = results.filter(r => r.status === FileStatus.MISSING).length;
  const errorCount = namingErrCount + formatErrCount + missingCount;

  const getPercentage = (count: number) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  return (
    <div className="result-summary">
      <h3>比對結果摘要</h3>
      
      <div className="summary-stats">
        <div 
          className={`stat-item ${activeFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => onFilterChange('ALL')}
        >
          <div className="stat-label">總數</div>
          <div className="stat-value">{total}</div>
        </div>
        
        <div 
          className={`stat-item stat-match ${activeFilter === FileStatus.MATCH || activeFilter === 'MATCHES' ? 'active' : ''}`}
          onClick={() => onFilterChange(FileStatus.MATCH)}
        >
          <div className="stat-label">✅ 匹配</div>
          <div className="stat-value">{matchCount} ({getPercentage(matchCount)}%)</div>
        </div>
        
        <div 
          className={`stat-item stat-error ${activeFilter === 'ERRORS' ? 'active' : ''}`}
          onClick={() => onFilterChange('ERRORS')}
        >
          <div className="stat-label">錯誤</div>
          <div className="stat-value">{errorCount} ({getPercentage(errorCount)}%)</div>
        </div>
      </div>

      <div className="summary-details">
        <div 
          className={`detail-item detail-match ${activeFilter === FileStatus.MATCH ? 'active' : ''}`}
          onClick={() => onFilterChange(FileStatus.MATCH)}
        >
          <span className="detail-icon">✅</span>
          <span className="detail-label">完全匹配：</span>
          <span className="detail-count">{matchCount}</span>
        </div>
        
        <div 
          className={`detail-item detail-naming-err ${activeFilter === FileStatus.NAMING_ERR ? 'active' : ''}`}
          onClick={() => onFilterChange(FileStatus.NAMING_ERR)}
        >
          <span className="detail-icon">⚠️</span>
          <span className="detail-label">大小寫錯誤：</span>
          <span className="detail-count">{namingErrCount}</span>
        </div>
        
        <div 
          className={`detail-item detail-format-err ${activeFilter === FileStatus.FORMAT_ERR ? 'active' : ''}`}
          onClick={() => onFilterChange(FileStatus.FORMAT_ERR)}
        >
          <span className="detail-icon">⚠️</span>
          <span className="detail-label">格式錯誤：</span>
          <span className="detail-count">{formatErrCount}</span>
        </div>
        
        <div 
          className={`detail-item detail-missing ${activeFilter === FileStatus.MISSING ? 'active' : ''}`}
          onClick={() => onFilterChange(FileStatus.MISSING)}
        >
          <span className="detail-icon">❌</span>
          <span className="detail-label">漏檔：</span>
          <span className="detail-count">{missingCount}</span>
        </div>
      </div>

      {total > 0 && (
        <div className="summary-progress">
          <div className="progress-bar">
            <div
              className="progress-fill progress-match"
              style={{ width: `${getPercentage(matchCount)}%` }}
            ></div>
            <div
              className="progress-fill progress-error"
              style={{ width: `${getPercentage(errorCount)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
