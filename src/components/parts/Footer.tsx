import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      ミルシルマップ &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          pb: 2,
          textAlign: { sm: 'center', md: 'left' },
          mb: { xs: '65px', md: 0 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            width: '100%',
            justifyContent: { xs: 'center', sm: 'space-between' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: '60%',
              mb: { xs: 1, sm: 0 },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Copyright />
            </Box>
          </Box>
          {/* <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Features
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Testimonials
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Highlights
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Pricing
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              FAQs
            </Link>
          </Box> */}
          {/* <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              About us
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Careers
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Press
            </Link>
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Link
              color="text.secondary"
              variant="body2"
              href="/terms-of-service"
            >
              利用規約
            </Link>
            <Link color="text.secondary" variant="body2" href="/privacy">
              プライバシーポリシー
            </Link>
            <Link color="text.secondary" variant="body2" href="/contact">
              お問い合わせ
            </Link>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
