'use client';

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  googleReCaptchaToken?: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async () => {
    const postFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      postFormData.append(key, value);
    });

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_NEWT_FORM_ENDPOINT ?? '',
        {
          method: 'POST',
          body: postFormData,
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (response.ok) {
        router.push('/thanks');
      } else {
        router.push('/error');
      }
    } catch (err) {
      router.push('/error');
      console.error(err);
    }
  });

  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12 }}>
        <Box sx={{ p: 3, px: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              maxWidth: 600,
              margin: 'auto',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              お問い合わせ
            </Typography>
            <Box component="form" onSubmit={onSubmit}>
              {/* 問い合わせの種類（プルダウンリスト） */}
              {errors?.inquiryType && (
                <Box
                  id="error-inquiryType-required"
                  aria-live="assertive"
                  sx={{
                    color: 'red',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                  }}
                >
                  {errors.inquiryType.message}
                </Box>
              )}
              <TextField
                id="inquiryType"
                select
                label="お問い合わせ種別"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.inquiryType}
                {...register('inquiryType', {
                  required: 'お問い合わせ種別を選択してください',
                  onChange: (e) =>
                    setFormData({ ...formData, inquiryType: e.target.value }),
                })}
                aria-describedby="error-inquiryType-required"
                sx={{ mt: 1 }}
              >
                <MenuItem value="施設施設の追加・削除について">
                  施設の追加・削除について
                </MenuItem>
                <MenuItem value="施設の内容変更について">
                  施設の内容変更について
                </MenuItem>
                <MenuItem value="機能の追加要望">不具合について</MenuItem>
                <MenuItem value="機能の追加要望">機能の追加要望</MenuItem>
                <MenuItem value="その他のお問い合わせ">
                  その他のお問い合わせ
                </MenuItem>
              </TextField>

              {/* 名前フィールド */}
              {errors?.name && (
                <Box
                  id="error-name-required"
                  aria-live="assertive"
                  sx={{
                    color: 'red',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                  }}
                >
                  {errors.name.message}
                </Box>
              )}
              <TextField
                label="名前"
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                value={formData.name}
                {...register('name', {
                  required: '名前を入力してください',
                  onChange: (e) =>
                    setFormData({ ...formData, name: e.target.value }),
                })}
                aria-describedby="error-name-required"
                sx={{ mt: 1 }}
              />

              {/* メールアドレスフィールド */}
              <TextField
                label="メールアドレス"
                variant="outlined"
                fullWidth
                margin="normal"
                id="email"
                type="email"
                value={formData.email}
                {...register('email', {
                  onChange: (e) =>
                    setFormData({ ...formData, email: e.target.value }),
                })}
              />

              {/* 内容（複数行テキスト） */}
              {errors?.message && (
                <Box
                  id="error-message-required"
                  aria-live="assertive"
                  sx={{
                    color: 'red',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                  }}
                >
                  {errors.message.message}
                </Box>
              )}
              <TextField
                label="お問い合わせ内容"
                variant="outlined"
                fullWidth
                multiline
                minRows={6}
                margin="normal"
                id="message"
                value={formData.message}
                {...register('message', {
                  required: 'お問い合わせ内容を入力してください',
                  onChange: (e) =>
                    setFormData({ ...formData, message: e.target.value }),
                })}
                aria-describedby="error-message-required"
                sx={{ mt: 1 }}
              />

              {/* 送信ボタン */}
              <Box sx={{ display: 'block', textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 4 }}
                >
                  送信
                </Button>
              </Box>
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
