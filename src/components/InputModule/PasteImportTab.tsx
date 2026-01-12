import { useState, useCallback, useEffect, useRef } from 'react';
import { parsePastedText } from '../../utils/textParser';
import './InputModule.css';

interface PasteImportTabProps {
  onFileNamesReady: (fileNames: string[]) => void;
}

export default function PasteImportTab({ onFileNamesReady }: PasteImportTabProps) {
  const [text, setText] = useState('');
  const [useSpaceAsDelimiter, setUseSpaceAsDelimiter] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 解析文字並更新檔名列表
  const parseText = useCallback((inputText: string, useSpace: boolean) => {
    const parsed = parsePastedText(inputText, useSpace);
    setFileNames(parsed);
    onFileNamesReady(parsed);
  }, [onFileNamesReady]);

  // 當文字或分隔符選項改變時，使用防抖自動解析
  useEffect(() => {
    // 清除之前的計時器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 設定新的計時器，延遲 300ms 後執行解析
    debounceTimerRef.current = setTimeout(() => {
      if (text.trim()) {
        parseText(text, useSpaceAsDelimiter);
      } else {
        setFileNames([]);
        onFileNamesReady([]);
      }
    }, 300);

    // 清理函式
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [text, useSpaceAsDelimiter, parseText, onFileNamesReady]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handleSpaceDelimiterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSpaceAsDelimiter(e.target.checked);
  }, []);

  return (
    <div className="paste-import-tab">
      <div className="textarea-container">
        <textarea
          className="paste-textarea"
          placeholder="請貼上檔名清單，支援以下分隔符號：&#10;換行、逗號、分號、Tab"
          value={text}
          onChange={handleTextChange}
          rows={10}
        />
      </div>

      <div className="options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={useSpaceAsDelimiter}
            onChange={handleSpaceDelimiterChange}
          />
          <span>以空格作為分隔符號</span>
        </label>
      </div>

      {fileNames.length > 0 && (
        <div className="preview">
          <p className="preview-count">已解析出 {fileNames.length} 個檔案名稱</p>
        </div>
      )}

      {text.trim() && fileNames.length === 0 && (
        <div className="warning">
          <p>無法解析出任何檔名，請檢查輸入格式</p>
        </div>
      )}
    </div>
  );
}
