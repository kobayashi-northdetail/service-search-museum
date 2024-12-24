import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Privacy() {
  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12 }}>
        <Box sx={{ p: 3, px: { xs: 1, md: 2 } }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: 24 }}>
            プライバシーポリシー
          </Typography>

          <Typography variant="body1" gutterBottom>
            当サービスでは、ユーザーの個人情報や利用データを保護し、適切に管理するために、以下の方針に基づいて取り扱います。
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              1. 収集する情報の種類
            </Typography>

            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>個人情報</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                現時点では登録機能は設けておらず、お問い合わせ時に個人情報の収集は行いません。いただいた内容に基づき対応いたします。
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>位置情報</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                当サービスでは、Google Maps API
                を用いてユーザーの現在地を取得し、近隣施設の表示を行います。この位置情報は保存されません。
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>利用データ</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                サイトのアクセス解析には Google Analytics
                を使用していますが、個人情報の収集は行っておりません。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              2. 情報の利用目的
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                収集した情報は、以下の目的で使用されます。
              </Typography>
              <Typography variant="body2" gutterBottom>
                ・お問い合わせ内容に対する対応
              </Typography>
              <Typography variant="body2" gutterBottom>
                ・サービスの改善
              </Typography>
              <Typography variant="body2" gutterBottom>
                ・サイトのアクセス解析
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              3. 情報の共有・提供
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                お問い合わせ内容について、ユーザーの許可なく第三者に提供することはありません。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              4. Cookie およびトラッキング技術の使用
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当サービスでは、Google Analytics を利用したアクセス解析のために
                Cookie を使用しています。Cookie
                の管理については、ユーザー自身のブラウザ設定で管理いただけます。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              5. 情報の保存期間
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                お問い合わせ内容については、対応が完了した時点で削除いたします。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              6. ユーザーの権利
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                ユーザーからのお問い合わせ内容は、対応が完了した時点で削除します。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              7. セキュリティ対策
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当サービスでは、SSL
                暗号化通信を導入し、データの安全を確保しています。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              8. プライバシーポリシーの変更
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                プライバシーポリシーの変更が生じた場合は、本ページにて変更内容を掲載いたします。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              9. お問い合わせ先
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                現在、お問い合わせフォームの追加を予定しております。設置後、こちらにてご案内いたします。
              </Typography>
            </Box>
          </Box>
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
