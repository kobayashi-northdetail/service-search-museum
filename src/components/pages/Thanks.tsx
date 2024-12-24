'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Thanks() {
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
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={`m-plus-1`}
            >
              お問い合わせいただきありがとうございました
            </Typography>

            <Typography variant="body1" gutterBottom className={`m-plus-1`}>
              内容を確認の上、ご回答させていただきます。
            </Typography>

            {/* トップページへ戻るボタン */}
            <Box sx={{ display: 'block', textAlign: 'center', mt: 4 }}>
              <Link href="/facilities" passHref>
                <Button variant="outlined">トップページへ戻る</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
