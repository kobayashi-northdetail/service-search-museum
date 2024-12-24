import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12 }}>
        <Box sx={{ p: 3, px: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              maxWidth: 600,
              margin: '40px auto',
              padding: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              ページが見つかりません
            </Typography>

            <Typography variant="body1" gutterBottom>
              お探しのページが見つかりませんでした。
            </Typography>

            {/* ホームへ戻るボタン */}
            <Box sx={{ display: 'block', textAlign: 'center', mt: 4 }}>
              <Link href="/" passHref>
                <Button variant="outlined" color="primary">
                  ホームへ戻る
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
