'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function Login() {
  const [isCssLoading, setIsCssLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsCssLoading(false);
    }, 500);
  }, []);
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        className="m-plus-1"
        fontSize={{ xs: 20, md: 24 }}
        fontWeight={'bold'}
        mt={1}
        mb={3}
      >
        ミルシルマップにログイン
      </Typography>
      {isCssLoading ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '> div': {
              xs: { width: '100%', maxWidth: '100%' },
              md: { width: '50%', maxWidth: '50%' },
            },
          }}
        >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'メールアドレス',
                  email_input_placeholder: 'メールアドレスを入力してください',
                  password_label: 'パスワード',
                  password_input_placeholder: 'パスワードを入力してください',
                  button_label: 'ログイン',
                  social_provider_text: 'でログイン',
                  link_text: 'ログインはこちら',
                },
                sign_up: {
                  email_label: 'メールアドレス',
                  email_input_placeholder: 'メールアドレスを入力してください',
                  password_label: 'パスワード',
                  password_input_placeholder: 'パスワードを入力してください',
                  button_label: '登録する',
                  social_provider_text: 'で登録',
                  link_text: 'アカウントをお持ちでない場合はこちら',
                  confirmation_text:
                    '確認リンクが記載されたメールを送信しました。メールをご確認ください。',
                  loading_button_label: '登録処理中...',
                },
                forgotten_password: {
                  email_label: 'メールアドレス',
                  button_label: 'パスワードをリセット',
                  link_text: 'パスワードを忘れた方はこちら',
                },
                update_password: {
                  password_label: '新しいパスワード',
                  button_label: 'パスワードを更新',
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
