import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import {
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import NotFound from '@/app/not-found';
import { dirPath, mdxFiles } from '../libs';
import matter from 'gray-matter';
import Image from 'next/image';
import ThumbImage from './ThumbImage';
import { BlogMeta } from '../type';

const components = {
  Image,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Box,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const filePath = mdxFiles.find((file) => file.includes(article));

  if (!filePath) {
    return {
      title: 'Not Found',
    };
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter } = matter(source);

  return {
    title: frontMatter.title || 'Default Title',
  };
}

export function generateStaticParams() {
  return mdxFiles.map((filePath) => {
    const relativePath = path.relative(dirPath, filePath);
    // パスに含まれる '%2F' を区切り文字として、後ろの .mdx ファイル名のみを取得
    const article =
      relativePath
        .split('/')
        .pop()
        ?.replace(/\.mdx$/, '') || '';
    return { article };
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const filePath = mdxFiles.find((file) => file.includes(article));
  if (!filePath) {
    return <NotFound />;
  }
  const source = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter, content: mdxContent } = matter(
    source
  ) as unknown as { data: BlogMeta; content: string };

  // MDXのコンテンツを解析
  const { content } = await compileMDX({
    source: mdxContent,
    components,
  });

  return (
    <Box className="blog-contents" p={{ xs: 1, md: 3 }}>
      <Box mb={5}>
        <Box mb={6} sx={{ textAlign: 'center' }}>
          <ThumbImage
            src={frontMatter.thumbnail}
            alt="blog"
            width={400}
            height={300}
          />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          fontSize={{ xs: 20, md: 26 }}
        >
          {frontMatter.title}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
          {frontMatter.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ fontSize: { xs: 10, md: 12 } }}
            />
          ))}
        </Stack>
        <Stack mt={2}>
          <Typography fontSize={{ xs: 10, md: 12 }}>
            {frontMatter.date}
          </Typography>
        </Stack>
      </Box>
      <Box id="blog-body">{content}</Box>
    </Box>
  );
}
