'use client';

import { Box, IconButton, Typography } from '@mui/material';
import MuseumIcon from '@mui/icons-material/Museum';
import MapIcon from '@mui/icons-material/Map';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function BottomMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const handlePageTransition = (path: string) => {
    router.push(`${path}?${params.toString()}`);
  };
  // メニューの設定
  const bottomMenus = [
    {
      icon: (isCurrent: boolean) => (
        <MuseumIcon
          fontSize="medium"
          sx={{ color: isCurrent ? 'primary.main' : '#787156' }}
        />
      ),
      label: '施設一覧',
      path: '/facilities',
      isCurreunt: pathname === '/facilities/' || pathname === '/',
    },
    {
      icon: (isCurrent: boolean) => (
        <MapIcon
          fontSize="medium"
          sx={{ color: isCurrent ? 'primary.main' : '#787156' }}
        />
      ),
      label: '地図',
      path: '/map',
      isCurreunt: pathname === '/map/',
    },
    {
      icon: (isCurrent: boolean) => (
        <PinDropIcon
          fontSize="medium"
          sx={{ color: isCurrent ? 'primary.main' : '#787156' }}
        />
      ),
      label: '地域',
      path: '/areas',
      isCurreunt: pathname === '/areas/',
    },
  ];
  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        zIndex: 2000,
        bottom: 10,
        left: 0,
        right: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          width: '90%',
          mx: 'auto',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {bottomMenus.map((menu, index) => (
          <IconButton
            key={index}
            size="medium"
            onClick={() => handlePageTransition(menu.path)}
            sx={{
              color: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              height: '50px',
              width: '60px',
            }}
          >
            {menu.icon(menu.isCurreunt)}
            <Typography
              sx={{
                fontSize: 10,
                color: menu.isCurreunt ? 'primary.main' : '#787156',
              }}
            >
              {menu.label}
            </Typography>
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
