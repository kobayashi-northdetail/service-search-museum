import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

// 静的エクスポートとキャッシュ設定を追加
export const dynamic = "force-static";
export const revalidate = 86400; // サイトマップを24時間（86400秒）ごとに再生成

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const lastModified = new Date();

  // 固定ページのパス
  const staticPaths = [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/facilities/`,
      lastModified,
    },
    {
      url: `${baseUrl}/map/`,
      lastModified,
    },
    {
      url: `${baseUrl}/areas/`,
      lastModified,
    },
    {
      url: `${baseUrl}/info/`,
      lastModified,
    },
    {
      url: `${baseUrl}/guide/`,
      lastModified,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified,
    },
  ];

  // JSON ファイルから動的なパスを生成
  const dirPath = path.join(process.cwd(), 'src', 'assets', 'json', 'facility-json');
  const prefectures = fs.readdirSync(dirPath);

  const dynamicPaths = prefectures.flatMap((prefecture) => {
    const categoryDir = path.join(dirPath, prefecture);
    const categories = fs
      .readdirSync(categoryDir)
      .map((file) => file.replace('.json', ''));
    return categories.map((category) => ({
      url: `${baseUrl}/place/${prefecture}-${category}/`, // 都道府県とカテゴリーごとのURL
      lastModified,
    }));
  });

  // sitemap に静的パスと動的パスを結合して返す
  return [...staticPaths, ...dynamicPaths];
}
