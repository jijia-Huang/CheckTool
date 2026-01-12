import { useState, useEffect } from 'react';
import InputModule from './components/InputModule/InputModule';
import FileSystemModule from './components/FileSystemModule/FileSystemModule';
import ComparisonResultModule from './components/ComparisonResultModule/ComparisonResultModule';
import './App.css';

type Step = 'INPUT' | 'SCAN' | 'COMPARE';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('INPUT');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileIndex, setFileIndex] = useState<Map<string, string> | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 初始化深色模式（從 localStorage 或系統偏好）
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleFileNamesReady = (names: string[]) => {
    setFileNames(names);
  };

  const handleFileIndexReady = (index: Map<string, string>) => {
    setFileIndex(index);
  };

  const nextStep = () => {
    if (currentStep === 'INPUT' && fileNames.length > 0) setCurrentStep('SCAN');
    else if (currentStep === 'SCAN' && fileIndex) setCurrentStep('COMPARE');
  };

  const prevStep = () => {
    if (currentStep === 'SCAN') setCurrentStep('INPUT');
    else if (currentStep === 'COMPARE') setCurrentStep('SCAN');
  };

  const steps = [
    { id: 'INPUT', label: '1. 輸入規格', icon: '📝' },
    { id: 'SCAN', label: '2. 選擇目錄', icon: '📂' },
    { id: 'COMPARE', label: '3. 執行比對', icon: '🔍' },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 'INPUT':
        return (
          <div className="fade-in">
            <InputModule onFileNamesReady={handleFileNamesReady} />
            <div className="step-navigation">
              <button 
                className="nav-btn nav-btn-next" 
                disabled={fileNames.length === 0}
                onClick={nextStep}
              >
                下一步：選擇目錄 →
              </button>
            </div>
          </div>
        );
      case 'SCAN':
        return (
          <div className="fade-in">
            <FileSystemModule onFileIndexReady={handleFileIndexReady} />
            <div className="step-navigation">
              <button className="nav-btn nav-btn-prev" onClick={prevStep}>
                ← 上一步：輸入規格
              </button>
              <button 
                className="nav-btn nav-btn-next" 
                disabled={!fileIndex}
                onClick={nextStep}
              >
                下一步：執行比對 →
              </button>
            </div>
          </div>
        );
      case 'COMPARE':
        return (
          <div className="fade-in">
            {fileIndex && (
              <ComparisonResultModule
                fileNames={fileNames}
                fileIndex={fileIndex}
              />
            )}
            <div className="step-navigation">
              <button className="nav-btn nav-btn-prev" onClick={prevStep}>
                ← 上一步：調整目錄
              </button>
              <button className="nav-btn nav-btn-prev" onClick={() => {
                setFileNames([]);
                setFileIndex(null);
                setCurrentStep('INPUT');
              }}>
                🔄 重新開始
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>美術回檔確認工具</h1>
          <p>Art Asset Verification Tool</p>
        </div>
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          title={isDarkMode ? '切換至淺色模式' : '切換至深色模式'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>
      
      <main className="App-main">
        <div className="step-indicator">
          {steps.map((step, index) => {
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            const isActive = step.id === currentStep;
            return (
              <div 
                key={step.id} 
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <div className="step-number">
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className="step-label">{step.label}</div>
              </div>
            );
          })}
        </div>

        {renderStepContent()}
      </main>
    </div>
  );
}

export default App;
