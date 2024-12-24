import Facility from '@/components/pages/Facility';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '一覧から探す | ミルシルマップ',
  openGraph: {
    title: '一覧から探す | ミルシルマップ',
  },
  twitter: {
    title: '一覧から探す | ミルシルマップ',
  },
};

export default function Home() {
  return <Facility />;
}
