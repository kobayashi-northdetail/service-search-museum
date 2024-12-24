import { M_PLUS_1 } from 'next/font/google';
import { Box, Typography } from '@mui/material';

const TitleFont = M_PLUS_1({
  weight: '700',
  subsets: ['latin'],
});

export default function SitemarkIcon() {
  return (
    <Box component={'h1'} sx={{ m: 0, lineHeight: 0 }}>
      <Typography
        className={`${TitleFont.className} m-plus-1`}
        component={'a'}
        href="/"
        sx={{
          color: '#0288d1',
          mr: 4,
          fontSize: 20,
          textDecoration: 'none',
          fontWeight: 'bold !important',
        }}
      >
        ミルシルマップ
      </Typography>
    </Box>
  );
}
