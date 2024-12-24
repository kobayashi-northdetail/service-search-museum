import Contact from '@/components/pages/Contact';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  openGraph: {
    title: 'お問い合わせ | ミルシルマップ',
  },
  twitter: {
    title: 'お問い合わせ | ミルシルマップ',
  },
};

const page = () => {
  return (
    <Box>
      <Contact />
    </Box>
  );
};

export default page;
