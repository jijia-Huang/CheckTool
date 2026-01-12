/**
 * 解析貼上的文字，提取檔名列表
 */
export function parsePastedText(
  text: string,
  useSpaceAsDelimiter: boolean = false
): string[] {
  // 主要分隔符號：換行符、逗號、分號、Tab
  const delimiters = useSpaceAsDelimiter
    ? [/\n/, /\r/, /,/, /;/, /\t/, /\s+/]
    : [/\n/, /\r/, /,/, /;/, /\t/];

  let result: string[] = [text];

  // 依序使用分隔符號分割
  for (const delimiter of delimiters) {
    result = result.flatMap((item) => item.split(delimiter));
  }

  // 資料清洗
  return result
    .map((item) => item.trim()) // 去除前後空白
    .map((item) => item.replace(/^["']|["']$/g, '')) // 去除引號
    .filter((item) => item.length > 0); // 過濾空字串
}
