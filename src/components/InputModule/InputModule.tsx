import { useState } from 'react';
import ExcelImportTab from './ExcelImportTab';
import PasteImportTab from './PasteImportTab';
import './InputModule.css';

interface InputModuleProps {
  onFileNamesReady: (fileNames: string[]) => void;
}

type TabType = 'excel' | 'paste';

export default function InputModule({ onFileNamesReady }: InputModuleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('excel');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [showPreviewList, setShowPreviewList] = useState(false);

  const handleFileNamesReady = (names: string[]) => {
    setFileNames(names);
    onFileNamesReady(names);
  };

  return (
    <div className="input-module">
      <h2>輸入規格列表</h2>
      
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'excel' ? 'active' : ''}`}
          onClick={() => setActiveTab('excel')}
        >
          Excel 匯入
        </button>
        <button
          className={`tab-button ${activeTab === 'paste' ? 'active' : ''}`}
          onClick={() => setActiveTab('paste')}
        >
          文字貼上
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'excel' && (
          <ExcelImportTab onFileNamesReady={handleFileNamesReady} />
        )}
        {activeTab === 'paste' && (
          <PasteImportTab onFileNamesReady={handleFileNamesReady} />
        )}
      </div>

      {fileNames.length > 0 && (
        <div className="input-preview-section">
          <div className="input-preview-header" onClick={() => setShowPreviewList(!showPreviewList)}>
            <span className="preview-summary">已解析出 <strong>{fileNames.length}</strong> 個檔案名稱</span>
            <button className="toggle-list-btn">
              {showPreviewList ? '隱藏列表 ▴' : '顯示列表 ▾'}
            </button>
          </div>
          
          {showPreviewList && (
            <div className="input-file-list">
              {fileNames.map((name, index) => (
                <div key={`${name}-${index}`} className="input-file-item">
                  <span className="item-index">{index + 1}.</span>
                  <span className="item-name">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
