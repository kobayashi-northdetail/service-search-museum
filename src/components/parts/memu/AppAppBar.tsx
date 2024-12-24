'use client';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { BottomMenu } from '@/components/parts/memu/BottomMenu';
import { GlobalMenu } from './GlobalMenu';
import { useEffect, useState } from 'react';

export default function AppAppBar() {
  const [isHidden, setIsHidden] = useState(false); // AppBarの表示状態
  const [lastScrollY, setLastScrollY] = useState(0); // 最後のスクロール位置

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 下にスクロール中かつスクロール位置が100px以上の場合は非表示
        setIsHidden(true);
      } else {
        // 上にスクロール中またはスクロール位置が100px以下の場合は表示
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY); // 最後のスクロール位置を更新
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 'calc(var(--template-frame-height, 0px) + 28px)',
          transform: {
            xs: isHidden ? 'translateY(-200%)' : 'translateY(0)',
            md: 'translateY(0)',
          },
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* グローバルナビ */}
        <Container maxWidth="lg">
          <GlobalMenu />
        </Container>
      </AppBar>
      {/* スマホ用に画面下固定でメニューエリアを表示する */}
      <BottomMenu />
    </>
  );
}
