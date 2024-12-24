import Areas from '@/components/pages/Areas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '地域から探す',
  openGraph: {
    title: '地域から探す | ミルシルマップ',
  },
  twitter: {
    title: '地域から探す | ミルシルマップ',
  },
};

export default function Home() {
  return <Areas />;
}
