import { Container } from '@mui/material';
import '@/assets/css/blog.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      className="blog-contents"
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
      {children}
    </Container>
  );
}
