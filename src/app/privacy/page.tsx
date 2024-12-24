import Privacy from '@/components/pages/Privacy';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  openGraph: {
    title: 'プライバシーポリシー | ミルシルマップ',
  },
  twitter: {
    title: 'プライバシーポリシー | ミルシルマップ',
  },
};

const page = () => {
  return (
    <Box>
      <Privacy />
    </Box>
  );
};

export default page;
