import { FileStatus, ComparisonResult } from '../types';

/**
 * 從完整路徑提取檔名
 */
function getFileName(filePath: string): string {
  const parts = filePath.split(/[/\\]/);
  return parts[parts.length - 1];
}

/**
 * 從檔名提取副檔名
 */
function getExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot >= 0 ? fileName.substring(lastDot) : '';
}

/**
 * 建立檔案索引（小寫檔名 -> 完整路徑）
 */
export function buildFileIndex(filePaths: string[]): Map<string, string> {
  const index = new Map<string, string>();

  for (const filePath of filePaths) {
    const fileName = getFileName(filePath);
    const lowerFileName = fileName.toLowerCase();
    
    // 如果已經存在（大小寫不同），保留第一個
    if (!index.has(lowerFileName)) {
      index.set(lowerFileName, filePath);
    }
  }

  return index;
}

/**
 * 比對單一檔名
 */
export function compareFileName(
  expectedName: string,
  fileIndex: Map<string, string>
): ComparisonResult {
  const lowerExpected = expectedName.toLowerCase();
  const actualPath = fileIndex.get(lowerExpected);

  if (!actualPath) {
    return {
      expectedName,
      status: FileStatus.MISSING,
      errorMessage: '[漏檔] 找不到檔案',
    };
  }

  const actualFileName = getFileName(actualPath);
  const expectedExt = getExtension(expectedName);
  const actualExt = getExtension(actualFileName);

  // 完全匹配
  if (actualFileName === expectedName) {
    return {
      expectedName,
      status: FileStatus.MATCH,
      actualPath,
    };
  }

  // 副檔名不一致
  if (expectedExt.toLowerCase() !== actualExt.toLowerCase()) {
    return {
      expectedName,
      status: FileStatus.FORMAT_ERR,
      actualPath,
      errorMessage: `[格式錯誤] 實檔為: ${actualFileName}`,
    };
  }

  // 大小寫不一致
  if (actualFileName.toLowerCase() === expectedName.toLowerCase()) {
    return {
      expectedName,
      status: FileStatus.NAMING_ERR,
      actualPath,
      errorMessage: `[大小寫錯誤] 實檔為: ${actualFileName}`,
    };
  }

  // 其他情況（理論上不應該發生）
  return {
    expectedName,
    status: FileStatus.MISSING,
    errorMessage: '[漏檔] 找不到檔案',
  };
}

/**
 * 批次比對檔名列表
 */
export function compareFileNames(
  expectedNames: string[],
  fileIndex: Map<string, string>
): ComparisonResult[] {
  return expectedNames.map((name) => compareFileName(name, fileIndex));
}
