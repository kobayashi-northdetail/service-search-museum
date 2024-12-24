import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12 }}>
        <Box sx={{ p: 3, px: { xs: 1, md: 2 } }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: 24 }}>
            利用規約
          </Typography>

          <Typography variant="body1" gutterBottom>
            本利用規約（以下、「本規約」といいます。）は、本サービスの利用条件を定めるものです。利用にあたり、以下の内容をご確認ください。
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              第1条（適用）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                本規約は、ユーザーと当サービスの運営者（以下、「当社」といいます。）との間の一切の関係に適用されます。
              </Typography>
              <Typography variant="body2" gutterBottom>
                当サービスに関して、当社が別途定める規定や注意事項も、本規約の一部として適用されます。
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第2条（利用登録）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当サービスの利用にあたり、特定の機能には利用登録が必要になる場合があります。
              </Typography>
              <Typography variant="body2" gutterBottom>
                当社は、申請者が虚偽の情報を申請した場合、過去に本規約に違反したことがある場合など、利用登録を承認しないことがあります。
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第3条（禁止事項）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                ユーザーは、当サービスの利用にあたり、以下の行為をしてはなりません。
              </Typography>
              <Typography variant="body2" component="ul" sx={{ pl: 3 }}>
                <li>法令または公序良俗に違反する行為</li>
                <li>サービスの運営を妨害する行為</li>
                <li>他のユーザーの個人情報を侵害する行為</li>
                <li>当サービスの情報を無断で商業利用する行為</li>
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第4条（サービスの提供の停止等）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当社は、当サービスにかかるシステムの保守点検や不可抗力によりサービスの提供を停止することができます。
              </Typography>
              <Typography variant="body2" gutterBottom>
                当社は、サービス提供の停止によるユーザーの不利益に対して責任を負いません。
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第5条（著作権）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当サービスのコンテンツに関する著作権は、すべて当社または正当な権利を有する第三者に帰属します。
              </Typography>
              <Typography variant="body2" gutterBottom>
                ユーザーは、当サービスのコンテンツを無断で使用することを禁じます。
              </Typography>
              <Typography variant="body2" gutterBottom>
                本サービスに掲載されている一部の画像は、クリエイティブ・コモンズ
                表示-継承 4.0 国際 (CC BY-SA 4.0)
                に基づき、Wikipediaより取得したものです。
              </Typography>
              <Typography variant="body2" gutterBottom>
                出典および著作者情報は、
                <Typography
                  variant="body2"
                  component="a"
                  href="https://ja.wikipedia.org/wiki/Wikipedia:%E3%82%A6%E3%82%A3%E3%82%AD%E3%83%9A%E3%83%87%E3%82%A3%E3%82%A2%E3%82%92%E4%BA%8C%E6%AC%A1%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B"
                  target="blank"
                  gutterBottom
                >
                  [ウィキペディアを二次利用する]
                </Typography>
                で確認できます。
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第6条（免責事項）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当社は、当サービスにおいて提供する情報について、その正確性を保証しません。
              </Typography>
              <Typography variant="body2" gutterBottom>
                当サービスの利用によりユーザーに生じた損害について、当社は一切の責任を負いません。
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第7条（利用規約の変更）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                当社は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができます。
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
              第8条（準拠法および管轄裁判所）
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 4 } }}>
              <Typography variant="body2" gutterBottom>
                本規約の解釈にあたっては、日本法を準拠法とします。
              </Typography>
              <Typography variant="body2" gutterBottom>
                当サービスに関する紛争は、当社の所在地を管轄する裁判所を専属的合意管轄とします。
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
