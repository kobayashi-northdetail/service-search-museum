import fs from 'fs';
import path from 'path';

// 再帰的にすべてのmdxファイルを取得する関数
function getAllMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getAllMdxFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      return fullPath;
    }
    return [];
  });
}
export const dirPath = path.join(process.cwd(), 'src', 'app', 'blog', '_article');
export const mdxFiles = getAllMdxFiles(dirPath);