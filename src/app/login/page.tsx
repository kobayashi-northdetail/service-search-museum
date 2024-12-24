import { Container } from '@mui/material';
import Login from '@/components/pages/Login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン',
  openGraph: {
    title: 'ログイン | ミルシルマップ',
  },
  twitter: {
    title: 'ログイン | ミルシルマップ',
  },
};

export default function Page() {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 12,
        mb: 10,
        gap: 4,
      }}
    >
      <Login />
    </Container>
  );
}
