import { useState, useCallback } from 'react';
import './FileSystemModule.css';

interface DirectorySelectorProps {
  onDirectorySelected: (dirPath: string) => void;
}

export default function DirectorySelector({ onDirectorySelected }: DirectorySelectorProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectDirectory = useCallback(async () => {
    if (!window.electronAPI) {
      setError('Electron API 不可用');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dirPath = await window.electronAPI.selectDirectory();
      
      if (dirPath) {
        setSelectedPath(dirPath);
        onDirectorySelected(dirPath);
      } else {
        // 使用者取消選擇，不顯示錯誤
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '選擇目錄失敗');
      console.error('Error selecting directory:', err);
    } finally {
      setIsLoading(false);
    }
  }, [onDirectorySelected]);

  return (
    <div className="directory-selector">
      <button
        className="select-directory-button"
        onClick={handleSelectDirectory}
        disabled={isLoading}
      >
        {isLoading ? '選擇中...' : '選擇目錄'}
      </button>

      {selectedPath && (
        <div className="selected-path">
          <p className="path-label">已選取目錄：</p>
          <p className="path-value">{selectedPath}</p>
        </div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
}
