import { mdxFiles } from './libs';
import fs from 'fs';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { Box, Stack, Typography } from '@mui/material';
import { BlogMeta } from './type';
import { BlogCard } from './BlogCard';

export const metadata: Metadata = {
  title: 'ブログ一覧',
};

function getMdxNamesWithYear(paths: string[]) {
  return paths
    .filter((path) => {
      const parts = path.split('/');
      const yearPart = parts[parts.length - 2];
      return /^\d{4}$/.test(yearPart); // 後ろから2番目の要素が4桁の数字かどうかをチェック
    })
    .map((path) => path.split('/').pop()?.replace('.mdx', '')); // ファイル名だけを取得
}

export default function page() {
  const paths = getMdxNamesWithYear(mdxFiles);
  const blogs: BlogMeta[] = paths
    .map((path) => {
      if (!path) return;
      const filePath = mdxFiles.find((file) => file.includes(path));
      if (!filePath) return;

      const source = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(source); // メタ情報を取得

      return {
        path,
        thumbnail: frontMatter.thumbnail || '/img/noimage.png', // サムネイルがなければ空文字を設定
        title: frontMatter.title || path.replace(/^\d{4}-/, ''), // タイトルがなければファイル名を使用
        date: frontMatter.date || 'No Date', // 日付がなければデフォルト値を設定
        tags: frontMatter.tags || [],
        author: frontMatter.author || 'Unknown Author', // 著者がなければデフォルト値を設定
      };
    })
    .filter((blog): blog is BlogMeta => blog !== undefined); // blogs配列からundefinedを除去

  return (
    <Box p={{ xs: 1, md: 3 }}>
      <Typography
        component="h2"
        fontWeight="bold"
        fontSize={{ xs: 20, md: 24 }}
        mb={2}
      >
        記事一覧
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2} rowGap={7}>
        {blogs.map((blog) => (
          <BlogCard key={blog.title} data={blog} />
        ))}
      </Stack>
    </Box>
  );
}
