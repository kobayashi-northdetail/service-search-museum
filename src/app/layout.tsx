import AppAppBar from '@/components/parts/memu/AppAppBar';
import Footer from '@/components/parts/Footer';
import FacilityDataProvider from '@/provider/FacilityDataProvider';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Suspense } from 'react';
import '@/assets/css/global.scss';
import Script from 'next/script';
import CustomThemeProvider from '@/provider/CustomThemeProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import PrefectureTypeList from '@/components/parts/PrefectureTypeList';
import GoogleAdsense from '@/components/ads/GoogleAdsense';

//北海道
import HokkaidoMuseumsList from '@/assets/json/facility-json/hokkaido/museum.json';
import HokkaidoArtList from '@/assets/json/facility-json/hokkaido/art.json';
import HokkaidoZooList from '@/assets/json/facility-json/hokkaido/zoo.json';
import HokkaidoAquariumList from '@/assets/json/facility-json/hokkaido/aquarium.json';

// 東北
import AomoriMuseumList from '@/assets/json/facility-json/aomori/museum.json';
import AomoriArtList from '@/assets/json/facility-json/aomori/art.json';
import AomoriAqruariumList from '@/assets/json/facility-json/aomori/aquarium.json';
import AomoriZooList from '@/assets/json/facility-json/aomori/zoo.json';
import IwateMuseumList from '@/assets/json/facility-json/iwate/museum.json';
import IwateArtList from '@/assets/json/facility-json/iwate/art.json';
import IwateAquariumList from '@/assets/json/facility-json/iwate/aquarium.json';
import IwateZooList from '@/assets/json/facility-json/iwate/zoo.json';
import AkitaMuseumList from '@/assets/json/facility-json/akita/museum.json';
import AkitaArtList from '@/assets/json/facility-json/akita/art.json';
import AkitaAquariumList from '@/assets/json/facility-json/akita/aquarium.json';
import AkitaZooList from '@/assets/json/facility-json/akita/zoo.json';
import MiyagiMuseumList from '@/assets/json/facility-json/miyagi/museum.json';
import MiyagiArtList from '@/assets/json/facility-json/miyagi/art.json';
import MiyagiAquariumList from '@/assets/json/facility-json/miyagi/aquarium.json';
import MiyagiZooList from '@/assets/json/facility-json/miyagi/zoo.json';
import YamagataMuseumList from '@/assets/json/facility-json/yamagata/museum.json';
import YamagataArtList from '@/assets/json/facility-json/yamagata/art.json';
import YamagataAquariumList from '@/assets/json/facility-json/yamagata/aquarium.json';
import YamagataZooList from '@/assets/json/facility-json/yamagata/zoo.json';
import FukushimaMuseumList from '@/assets/json/facility-json/fukushima/museum.json';
import FukushimaArtList from '@/assets/json/facility-json/fukushima/art.json';
import FukushimaAquariumList from '@/assets/json/facility-json/fukushima/aquarium.json';
import FukushimaZooList from '@/assets/json/facility-json/fukushima/zoo.json';

// 関東
import IbarakiMuseumList from '@/assets/json/facility-json/ibaraki/museum.json';
import IbarakiArtList from '@/assets/json/facility-json/ibaraki/art.json';
import IbarakiAquariumList from '@/assets/json/facility-json/ibaraki/aquarium.json';
import IbarakiZooList from '@/assets/json/facility-json/ibaraki/zoo.json';
import TochigiMuseumList from '@/assets/json/facility-json/tochigi/museum.json';
import TochigiArtList from '@/assets/json/facility-json/tochigi/art.json';
import TochigiAquariumList from '@/assets/json/facility-json/tochigi/aquarium.json';
import TochigiZooList from '@/assets/json/facility-json/tochigi/zoo.json';
import GunmaMuseumList from '@/assets/json/facility-json/gunma/museum.json';
import GunmaArtList from '@/assets/json/facility-json/gunma/art.json';
import GunmaAquariumList from '@/assets/json/facility-json/gunma/aquarium.json';
import GunmaZooList from '@/assets/json/facility-json/gunma/zoo.json';
import SaitamaMuseumList from '@/assets/json/facility-json/saitama/museum.json';
import SaitamaArtList from '@/assets/json/facility-json/saitama/art.json';
import ChibaMuseumList from '@/assets/json/facility-json/chiba/museum.json';
import ChibaArtList from '@/assets/json/facility-json/chiba/art.json';
import TokyoMuseumList from '@/assets/json/facility-json/tokyo/museum.json';
import TokyoArtList from '@/assets/json/facility-json/tokyo/art.json';
import TokyoAquariumList from '@/assets/json/facility-json/tokyo/aquarium.json';
import KanagawaMuseumList from '@/assets/json/facility-json/kanagawa/museum.json';
import KanagawaArtList from '@/assets/json/facility-json/kanagawa/art.json';

// 中部
import NiigataMuseumList from '@/assets/json/facility-json/niigata/museum.json';
import NiigataArtList from '@/assets/json/facility-json/niigata/art.json';
import ToyamaMuseumList from '@/assets/json/facility-json/toyama/museum.json';
import ToyamaArtList from '@/assets/json/facility-json/toyama/art.json';
import IshikawaMuseumList from '@/assets/json/facility-json/ishikawa/museum.json';
import IshikawaArtList from '@/assets/json/facility-json/ishikawa/art.json';
import FukuiMuseumList from '@/assets/json/facility-json/fukui/museum.json';
import YamanashiMuseumList from '@/assets/json/facility-json/yamanashi/museum.json';
import YamanashiArtList from '@/assets/json/facility-json/yamanashi/art.json';
import NaganoMuseumList from '@/assets/json/facility-json/nagano/museum.json';
import NaganoArtList from '@/assets/json/facility-json/nagano/art.json';
import GifuMuseumList from '@/assets/json/facility-json/gifu/museum.json';
import GifuArtList from '@/assets/json/facility-json/gifu/art.json';
import ShizuokaMuseumList from '@/assets/json/facility-json/shizuoka/museum.json';
import ShizuokaArtList from '@/assets/json/facility-json/shizuoka/art.json';
import AichiMuseumList from '@/assets/json/facility-json/aichi/museum.json';
import AichiArtList from '@/assets/json/facility-json/aichi/art.json';

// 近畿
import MieMuseumList from '@/assets/json/facility-json/mie/museum.json';
import MieArtList from '@/assets/json/facility-json/mie/art.json';
import ShigaMuseumList from '@/assets/json/facility-json/shiga/museum.json';
import ShigaArtList from '@/assets/json/facility-json/shiga/art.json';
import KyotoMuseumList from '@/assets/json/facility-json/kyoto/museum.json';
import KyotoArtList from '@/assets/json/facility-json/kyoto/art.json';
import OsakaMuseumList from '@/assets/json/facility-json/osaka/museum.json';
import OsakaArtList from '@/assets/json/facility-json/osaka/art.json';
import HyogoMuseumList from '@/assets/json/facility-json/hyogo/museum.json';
import HyogoArtList from '@/assets/json/facility-json/hyogo/art.json';
import NaraMuseumList from '@/assets/json/facility-json/nara/museum.json';
import NaraArtList from '@/assets/json/facility-json/nara/art.json';
import WakayamaMuseumList from '@/assets/json/facility-json/wakayama/museum.json';
import WakayamaArtList from '@/assets/json/facility-json/wakayama/art.json';

// 中国
import TottoriMuseumList from '@/assets/json/facility-json/tottori/museum.json';
import TottoriArtList from '@/assets/json/facility-json/tottori/art.json';
import ShimaneMuseumList from '@/assets/json/facility-json/shimane/museum.json';
import ShimaneArtList from '@/assets/json/facility-json/shimane/art.json';
import OkayamaMuseumList from '@/assets/json/facility-json/okayama/museum.json';
import OkayamaArtList from '@/assets/json/facility-json/okayama/art.json';
import HiroshimaMuseumList from '@/assets/json/facility-json/hiroshima/museum.json';
import HiroshimaArtList from '@/assets/json/facility-json/hiroshima/art.json';
import YamaguchiMuseumList from '@/assets/json/facility-json/yamaguchi/museum.json';
import YamaguchiArtList from '@/assets/json/facility-json/yamaguchi/art.json';

// 四国
import TokushimaMuseumList from '@/assets/json/facility-json/tokushima/museum.json';
import TokushimaArtList from '@/assets/json/facility-json/tokushima/art.json';
import KagawaMuseumList from '@/assets/json/facility-json/kagawa/museum.json';
import KagawaArtList from '@/assets/json/facility-json/kagawa/art.json';
import EhimeMuseumList from '@/assets/json/facility-json/ehime/museum.json';
import EhimeArtList from '@/assets/json/facility-json/ehime/art.json';
import KochiMuseumList from '@/assets/json/facility-json/kochi/museum.json';
import KochiArtList from '@/assets/json/facility-json/kochi/art.json';

// 九州・沖縄
import FukuokaMuseumList from '@/assets/json/facility-json/fukuoka/museum.json';
import FukuokaArtList from '@/assets/json/facility-json/fukuoka/art.json';
import SagaMuseumList from '@/assets/json/facility-json/saga/museum.json';
import SagaArtList from '@/assets/json/facility-json/saga/art.json';
import NagasakiMuseumList from '@/assets/json/facility-json/nagasaki/museum.json';
import NagasakiArtList from '@/assets/json/facility-json/nagasaki/art.json';
import KumamotoMuseumList from '@/assets/json/facility-json/kumamoto/museum.json';
import KumamotoArtList from '@/assets/json/facility-json/kumamoto/art.json';
import OitaMuseumList from '@/assets/json/facility-json/oita/museum.json';
import OitaArtList from '@/assets/json/facility-json/oita/art.json';
import MiyazakiMuseumList from '@/assets/json/facility-json/miyazaki/museum.json';
import MiyazakiArtList from '@/assets/json/facility-json/miyazaki/art.json';
import KagoshimaMuseumList from '@/assets/json/facility-json/kagoshima/museum.json';
import KagoshimaArtList from '@/assets/json/facility-json/kagoshima/art.json';
import OkinawaMuseumList from '@/assets/json/facility-json/okinawa/museum.json';
import OkinawaArtList from '@/assets/json/facility-json/okinawa/art.json';

import { AllFacilityProps } from '@/types';

const font = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: '', template: '%s | ミルシルマップ' },
  description:
    '博物館、美術館、水族館、動物園などの施設を検索・表示するサービスです。地図上での確認やカード形式のリスト表示が可能で、目的地の情報を簡単に見つけられます。',
  keywords:
    '博物館, 美術館, 水族館, 動物園, 検索サービス, 地図, 施設一覧, 施設検索',
  metadataBase: new URL('https://mirushiru-map.com'),
  openGraph: {
    title: 'ミルシルマップ',
    description:
      '博物館、美術館、水族館、動物園などの施設を検索・表示するサービスです。地図上での確認やカード形式のリスト表示が可能で、目的地の情報を簡単に見つけられます。',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ミルシルマップ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ミルシルマップ',
    description:
      '博物館、美術館、水族館、動物園などの施設を検索・表示するサービスです。地図上での確認やカード形式のリスト表示が可能で、目的地の情報を簡単に見つけられます。',
    images: ['/opengraph-image.png'],
  },
};

const allFacilitiesProps: AllFacilityProps[] = [
  // 北海道
  ...HokkaidoMuseumsList,
  ...HokkaidoArtList,
  ...HokkaidoZooList,
  ...HokkaidoAquariumList,
  // 東北
  ...AomoriMuseumList,
  ...AomoriArtList,
  ...AomoriAqruariumList,
  ...AomoriZooList,
  ...IwateMuseumList,
  ...IwateArtList,
  ...IwateAquariumList,
  ...IwateZooList,
  ...AkitaMuseumList,
  ...AkitaArtList,
  ...AkitaAquariumList,
  ...AkitaZooList,
  ...MiyagiMuseumList,
  ...MiyagiArtList,
  ...MiyagiAquariumList,
  ...MiyagiZooList,
  ...YamagataMuseumList,
  ...YamagataArtList,
  ...YamagataAquariumList,
  ...YamagataZooList,
  ...FukushimaMuseumList,
  ...FukushimaArtList,
  ...FukushimaAquariumList,
  ...FukushimaZooList,
  // 関東
  ...IbarakiMuseumList,
  ...IbarakiArtList,
  ...IbarakiAquariumList,
  ...IbarakiZooList,
  ...TochigiMuseumList,
  ...TochigiArtList,
  ...TochigiAquariumList,
  ...TochigiZooList,
  ...GunmaMuseumList,
  ...GunmaArtList,
  ...GunmaAquariumList,
  ...GunmaZooList,
  ...SaitamaMuseumList,
  ...SaitamaArtList,
  ...ChibaMuseumList,
  ...ChibaArtList,
  ...TokyoMuseumList,
  ...TokyoArtList,
  ...TokyoAquariumList,
  ...KanagawaMuseumList,
  ...KanagawaArtList,
  // 中部
  ...NiigataMuseumList,
  ...NiigataArtList,
  ...ToyamaMuseumList,
  ...ToyamaArtList,
  ...IshikawaMuseumList,
  ...IshikawaArtList,
  ...FukuiMuseumList,
  ...YamanashiMuseumList,
  ...YamanashiArtList,
  ...NaganoMuseumList,
  ...NaganoArtList,
  ...GifuMuseumList,
  ...GifuArtList,
  ...ShizuokaMuseumList,
  ...ShizuokaArtList,
  ...AichiMuseumList,
  ...AichiArtList,
  // 近畿
  ...MieMuseumList,
  ...MieArtList,
  ...ShigaMuseumList,
  ...ShigaArtList,
  ...KyotoMuseumList,
  ...KyotoArtList,
  ...OsakaMuseumList,
  ...OsakaArtList,
  ...HyogoMuseumList,
  ...HyogoArtList,
  ...NaraMuseumList,
  ...NaraArtList,
  ...WakayamaMuseumList,
  ...WakayamaArtList,
  // 中国
  ...TottoriMuseumList,
  ...TottoriArtList,
  ...ShimaneMuseumList,
  ...ShimaneArtList,
  ...OkayamaMuseumList,
  ...OkayamaArtList,
  ...HiroshimaMuseumList,
  ...HiroshimaArtList,
  ...YamaguchiMuseumList,
  ...YamaguchiArtList,
  // 四国
  ...TokushimaMuseumList,
  ...TokushimaArtList,
  ...KagawaMuseumList,
  ...KagawaArtList,
  ...EhimeMuseumList,
  ...EhimeArtList,
  ...KochiMuseumList,
  ...KochiArtList,
  // 九州・沖縄
  ...FukuokaMuseumList,
  ...FukuokaArtList,
  ...SagaMuseumList,
  ...SagaArtList,
  ...NagasakiMuseumList,
  ...NagasakiArtList,
  ...KumamotoMuseumList,
  ...KumamotoArtList,
  ...OitaMuseumList,
  ...OitaArtList,
  ...MiyazakiMuseumList,
  ...MiyazakiArtList,
  ...KagoshimaMuseumList,
  ...KagoshimaArtList,
  ...OkinawaMuseumList,
  ...OkinawaArtList,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={font.className}>
      <Script
        stylesheets={[
          'https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@400;700&display=swap',
        ]}
      />
      <CssBaseline />
      <body style={{ background: '#fffdfc' }}>
        <CustomThemeProvider>
          <Suspense fallback={<Box />}>
            <FacilityDataProvider allFacilitiesProps={allFacilitiesProps}>
              <AppAppBar />
              {children}
              <Container maxWidth="lg">
                <Box
                  sx={{
                    mt: 2,
                    mb: 5,
                    border: '1px solid #e1e1e1',
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    className="m-plus-1"
                    sx={{ mb: 2 }}
                  >
                    都道府県一覧ページ
                  </Typography>
                  <PrefectureTypeList />
                </Box>
              </Container>
              <Footer />
            </FacilityDataProvider>
          </Suspense>
        </CustomThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <GoogleAdsense />
      </body>
    </html>
  );
}
