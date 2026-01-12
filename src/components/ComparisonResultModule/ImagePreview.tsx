import { useState, useEffect } from 'react';
import { ComparisonResult, FileStatus } from '../../types';
import './ComparisonResultModule.css';

interface ImagePreviewProps {
  result: ComparisonResult | null;
  onClose: () => void;
}

export default function ImagePreview({ result, onClose }: ImagePreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (result) {
      setImageError(false);
      setImageLoading(true);
    }
  }, [result]);

  if (!result) {
    return null;
  }

  const isImageFile = (path: string) => {
    const ext = path.toLowerCase().substring(path.lastIndexOf('.'));
    return ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'].includes(ext);
  };

  const canPreview = result.status !== FileStatus.MISSING && 
                     result.actualPath && 
                     isImageFile(result.actualPath);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div className="image-preview-content" onClick={(e) => e.stopPropagation()}>
        <button className="preview-close-button" onClick={onClose}>
          ✕
        </button>
        
        <div className="preview-header">
          <h3>{result.expectedName}</h3>
          {result.actualPath && <p className="preview-path">{result.actualPath}</p>}
        </div>

        <div className="preview-body">
          {!canPreview ? (
            <div className="preview-placeholder">
              <p>無預覽圖</p>
              <p className="placeholder-reason">
                {result.status === FileStatus.MISSING
                  ? '檔案不存在'
                  : '不支援的檔案格式或非圖片檔案'}
              </p>
            </div>
          ) : (
            <>
              {imageLoading && (
                <div className="preview-loading">
                  <div className="spinner"></div>
                  <p>載入中...</p>
                </div>
              )}
              {imageError && (
                <div className="preview-error">
                  <p>無法載入圖片</p>
                  <p className="error-reason">檔案可能損壞或格式不支援</p>
                </div>
              )}
              {result.actualPath && (
                <img
                  src={`file:///${result.actualPath.replace(/\\/g, '/')}`}
                  alt={result.expectedName}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imageLoading || imageError ? 'none' : 'block' }}
                  className="preview-image"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
