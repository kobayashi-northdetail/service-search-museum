import Info from '@/components/pages/Info';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新着情報',
  openGraph: {
    title: '新着情報 | ミルシルマップ',
  },
  twitter: {
    title: '新着情報 | ミルシルマップ',
  },
};

const page = () => {
  return (
    <Box>
      <Info />
    </Box>
  );
};

export default page;
