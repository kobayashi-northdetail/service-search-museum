import TermsOfService from '@/components/pages/TermsOfService';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約',
  openGraph: {
    title: '利用規約 | ミルシルマップ',
  },
  twitter: {
    title: '利用規約 | ミルシルマップ',
  },
};

const page = () => {
  return (
    <Box>
      <TermsOfService />
    </Box>
  );
};

export default page;
