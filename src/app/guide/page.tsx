import Guide from '@/components/pages/Guide';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '操作方法',
  openGraph: {
    title: '操作方法 | ミルシルマップ',
  },
  twitter: {
    title: '操作方法 | ミルシルマップ',
  },
};

const page = () => {
  return (
    <Box>
      <Guide />
    </Box>
  );
};

export default page;
