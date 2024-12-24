import Types from '@/components/pages/Types';
import fs from 'fs';
import path from 'path';
import { prefectures, categories } from '@/settings/variables';
import NotFound from '@/app/not-found';

export async function generateStaticParams() {
  const dirPath = path.join(
    process.cwd(),
    'src',
    'assets',
    'json',
    'facility-json'
  );
  const prefectures = fs.readdirSync(dirPath);

  // 各都道府県のカテゴリ別にパスを生成
  const params = prefectures.flatMap((prefecture) => {
    const categoryDir = path.join(dirPath, prefecture);
    const categories = fs
      .readdirSync(categoryDir)
      .map((file) => file.replace('.json', ''));
    return categories.map((category) => ({
      types: `${prefecture}-${category}`,
    }));
  });

  return params;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ types: string }>;
}) {
  const { types } = await params;
  const [prefecture, category] = types.split('-');

  const prefectureData = prefectures.find((pref) => pref.id === prefecture);
  const prefetcureTitle = prefectureData ? prefectureData.name : '';
  const categoryData = categories.find((cate) => cate.id === category);
  const categoryTitle = categoryData ? categoryData.name : '';

  if (!prefectureData || !categoryData) {
    return <NotFound />;
  }

  return (
    <>
      <title>{`${prefetcureTitle}の${categoryTitle}一覧 | ミルシルマップ`}</title>
      {/* OGP画像のタイトル上書き */}
      <meta
        property="og:title"
        content={`${prefetcureTitle}の${categoryTitle}一覧 | ミルシルマップ`}
      />
      <Types prefectureData={prefectureData} categoryData={categoryData} />
    </>
  );
}
