import Map from '@/components/pages/Map';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '地図から探す',
  openGraph: {
    title: '地図から探す | ミルシルマップ',
  },
  twitter: {
    title: '地図から探す | ミルシルマップ',
  },
};

export default function Home() {
  return (
    <Box>
      <Map />
    </Box>
  );
}
