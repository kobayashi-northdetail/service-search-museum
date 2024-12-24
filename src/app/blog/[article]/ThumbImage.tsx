'use client'; // クライアントコンポーネントであることを宣言

import Image, { ImageProps } from 'next/image';
import { styled } from '@mui/material/styles';

type ResponsiveImageProps = ImageProps & {
  src: string;
  alt: string;
};

// MUIのstyled関数でレスポンシブなスタイルを定義
const StyledImage = styled(Image)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  aspectRatio: '16 / 9',
  [theme.breakpoints.up('md')]: {
    aspectRatio: '4 / 1', // md以上の画面幅でアスペクト比を変更
  },
}));

export default function ThumbImage(props: ResponsiveImageProps) {
  return <StyledImage {...props} />;
}
