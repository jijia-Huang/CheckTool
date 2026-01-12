import { useState, useCallback } from 'react';
import { ComparisonResult, FileStatus } from '../../types';
import { compareFileNames } from '../../utils/fileComparator';
import ResultList from './ResultList';
import ResultSummary from './ResultSummary';
import ImagePreview from './ImagePreview';
import './ComparisonResultModule.css';

interface ComparisonResultModuleProps {
  fileNames: string[];
  fileIndex: Map<string, string>;
}

export default function ComparisonResultModule({
  fileNames,
  fileIndex,
}: ComparisonResultModuleProps) {
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [selectedResult, setSelectedResult] = useState<ComparisonResult | null>(null);
  const [hasCompared, setHasCompared] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FileStatus | 'ALL' | 'MATCHES' | 'ERRORS'>('ALL');

  const handleStartComparison = useCallback(() => {
    if (fileNames.length === 0 || fileIndex.size === 0) {
      return;
    }

    setIsComparing(true);
    setSelectedResult(null);
    setFilterStatus('ALL');

    try {
      // 執行批次比對
      const comparisonResults = compareFileNames(fileNames, fileIndex);
      setResults(comparisonResults);
      setHasCompared(true);
    } catch (error) {
      console.error('Comparison error:', error);
      alert('比對過程中發生錯誤');
    } finally {
      setIsComparing(false);
    }
  }, [fileNames, fileIndex]);

  const handleItemClick = useCallback((result: ComparisonResult) => {
    setSelectedResult(result);
  }, []);

  const handleClosePreview = useCallback(() => {
    setSelectedResult(null);
  }, []);

  const handleFilterChange = (status: FileStatus | 'ALL' | 'MATCHES' | 'ERRORS') => {
    setFilterStatus(status);
  };

  const filteredResults = results.filter((result) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'MATCHES') return result.status === FileStatus.MATCH;
    if (filterStatus === 'ERRORS') return result.status !== FileStatus.MATCH;
    return result.status === filterStatus;
  });

  const canCompare = fileNames.length > 0 && fileIndex.size > 0 && !isComparing;

  return (
    <div className="comparison-result-module">
      <h2>執行比對</h2>

      {!hasCompared && (
        <div className="comparison-controls">
          <button
            className="start-comparison-button"
            onClick={handleStartComparison}
            disabled={!canCompare}
          >
            {isComparing ? '比對中...' : '開始比對'}
          </button>
          {!canCompare && (
            <p className="comparison-hint">
              {fileNames.length === 0 && '請先輸入檔名列表'}
              {fileIndex.size === 0 && '請先掃描檔案目錄'}
            </p>
          )}
        </div>
      )}

      {isComparing && (
        <div className="comparing-indicator">
          <div className="spinner"></div>
          <p>比對中...</p>
        </div>
      )}

      {hasCompared && (
        <>
          <ResultSummary 
            results={results} 
            activeFilter={filterStatus}
            onFilterChange={handleFilterChange} 
          />
          
          <div className="result-section">
            <div className="result-section-header">
              <h3>比對結果列表 ({filteredResults.length})</h3>
              <div className="filter-actions">
                <button 
                  className={`filter-btn ${filterStatus === 'ALL' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('ALL')}
                >
                  顯示全部
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'MATCHES' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('MATCHES')}
                >
                  顯示所有匹配
                </button>
              </div>
            </div>
            <ResultList results={filteredResults} onItemClick={handleItemClick} />
          </div>
        </>
      )}

      {hasCompared && results.length === 0 && (
        <div className="no-results">
          <p>沒有比對結果</p>
        </div>
      )}

      <ImagePreview result={selectedResult} onClose={handleClosePreview} />
    </div>
  );
}
