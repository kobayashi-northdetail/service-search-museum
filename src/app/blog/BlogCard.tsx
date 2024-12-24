import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { BlogMeta } from './type';
import Link from 'next/link';

export const BlogCard = ({ data }: { data: BlogMeta }) => {
  return (
    <Card
      sx={{
        width: { xs: '47%', sm: 200 },
        boxShadow: 0,
        '.MuiCardMedia-root': {
          opacity: 1,
          transition: 'opacity 0.2s ease-in-out', // 通常状態にもトランジションを設定
        },
        ':hover': {
          '.MuiCardMedia-root': {
            opacity: 0.8,
          },
        },
      }}
    >
      <Link
        href={`/blog/${data.path}`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          image={data.thumbnail}
          alt=""
          sx={{ aspectRatio: '16 / 9' }}
        />
        <CardContent
          sx={{
            p: '8px 4px 4px !important',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            fontSize={{ xs: 13, md: 14 }}
            fontWeight="bold"
            color="text.primary"
            mb={1}
          >
            {data.title}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap="4px" mt="auto" mb="4px">
            {data.tags.map((tag: string) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: { xs: 8, md: 9 },
                  height: 16,
                  '.MuiChip-label': {
                    px: '4px',
                  },
                }}
              />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary" fontSize={13}>
            {data.date}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
