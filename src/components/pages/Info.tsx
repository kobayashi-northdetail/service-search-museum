import { Box, Button, Container, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import SiteUpdateJson from '@/assets/json/info-json/info/site-update.json';
import FacilityUpdateJson from '@/assets/json/info-json/info/facilities-update.json';

export default function Info() {
  const infoData = [...SiteUpdateJson, ...FacilityUpdateJson]
    .sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    })
    .map((data, index) => {
      return {
        id: index,
        date: data.date,
        title: data.title,
        content: data.content,
      };
    });
  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12 }}>
        <Box sx={{ p: 3, px: { xs: 1, md: 2 } }}>
          <Paper
            sx={{
              maxWidth: 800,
              margin: '20px auto',
              padding: { xs: '10px', sm: '20px' },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                textAlign: 'center',
                padding: { xs: '10px', sm: '20px' },
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            >
              新着情報
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {infoData.map((news) => (
                <Box
                  key={news.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    borderBottom: '1px solid #ddd',
                    paddingBottom: '10px',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', fontSize: '1rem', mr: 2 }}
                    >
                      {news.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '0.8rem' }}>
                      (更新日:{news.date})
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '1rem' },
                    }}
                  >
                    {news.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Link href="/facilities">
            <Button variant="outlined">トップページへ戻る</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
