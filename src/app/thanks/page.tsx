import Thanks from '@/components/pages/Thanks';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせありがとうございます',
  openGraph: {
    title: 'お問い合わせありがとうございます | ミルシルマップ',
  },
  twitter: {
    title: 'お問い合わせありがとうございます | ミルシルマップ',
  },
};

const page = () => {
  return (
    <Box>
      <Thanks />
    </Box>
  );
};

export default page;
