import { Box, Button, Container, Typography } from '@mui/material';
import MuseumIcon from '@mui/icons-material/Museum';
import MapIcon from '@mui/icons-material/Map';
import PinDropIcon from '@mui/icons-material/PinDrop';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';

export default function Guide() {
  return (
    <Container maxWidth="md" component="main">
      <Box
        sx={{
          mt: 13,
          mb: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography
            className={`m-plus-1`}
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#0288d1' }}
          >
            操作方法ガイド
          </Typography>

          {/* 施設一覧から探す */}
          <Box sx={{ my: 5 }}>
            <Typography
              className={`m-plus-1`}
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <MuseumIcon
                fontSize="medium"
                sx={{ color: '#0288d1', mt: '2px' }}
              />
              施設一覧から探す
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              施設の一覧から、施設の種類や都道府県ごとに絞り込み検索を行うことができます。
              <br />
              例えば「博物館」を選択すれば、全国の博物館の中から興味のある施設を簡単に見つけられます。
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              各施設の詳細ページには、住所や概要のほか、Google
              Mapsアプリへのリンクもあるため、場所の確認やルート検索が簡単にできます。
              <br />
              訪問を検討している施設についてすぐに情報を得られる、便利な機能です。
            </Typography>
          </Box>

          {/* 地図から探す */}
          <Box sx={{ my: 5 }}>
            <Typography
              className={`m-plus-1`}
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <MapIcon fontSize="medium" sx={{ color: '#0288d1', mt: '2px' }} />
              地図から探す
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              地図上に表示された施設のアイコンから、各施設を探すことが可能です。
              <br />
              地図を見ながら、近隣や特定エリアにある施設の位置を一目で確認できるため、移動の際や複数の施設を巡りたい場合に役立ちます。
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              視覚的に場所を把握したいときや、旅行中のスケジュールに合わせて探したいときにおすすめの機能です。
            </Typography>
          </Box>

          {/* 地域から探す */}
          <Box sx={{ my: 5 }}>
            <Typography
              className={`m-plus-1`}
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <PinDropIcon
                fontSize="medium"
                sx={{ color: '#0288d1', mt: '2px' }}
              />
              地域から探す
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              地域名を五十音順で表示し、市町村ごとに絞り込み検索ができるため、特定の地域にどのような施設があるのかを簡単に確認できます。
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              たとえば、旅行先の市町村や自宅周辺の施設を探す際に役立つ機能で、効率的に情報を収集できます。
            </Typography>
          </Box>

          {/* お問い合わせ */}
          <Box sx={{ my: 5 }}>
            <Typography
              className={`m-plus-1`}
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <InfoIcon
                fontSize="medium"
                sx={{ color: '#0288d1', mt: '2px' }}
              />
              お問い合わせ
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              どんな些細なことでも構いませんので、ぜひお気軽にお問い合わせください。
              <br />
              施設の追加リクエストや、機能の改善要望などもお待ちしております。
            </Typography>
            <Typography
              className={`m-plus-1`}
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              ユーザーの皆さまからのご意見を元に、より良いサービスの提供に努めてまいります。
            </Typography>
          </Box>
        </Box>

        {/* トップページへ戻るボタン */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Link href="/facilities">
            <Button variant="outlined">トップページへ戻る</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
