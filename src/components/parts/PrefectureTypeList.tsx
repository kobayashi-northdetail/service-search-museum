'use client';

import { isLoadingAtom } from '@/store/atoms';
import { Button, Stack } from '@mui/material';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export default function PrefectureTypeList() {
  const router = useRouter();
  const setIsLoading = useSetAtom(isLoadingAtom);
  const hanedlePageTransition = (path: string) => {
    setIsLoading(true);
    router.push(path);
    window.scroll({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{
        gap: 2,
        justifyContent: { xs: 'center', sm: 'flex-start' },
      }}
    >
      <Button
        variant="outlined"
        sx={{ color: '#db8635', borderColor: '#db8635' }}
        onClick={() => hanedlePageTransition('/place/hokkaido-museum')}
      >
        <b>北海道</b>の<b>博物館</b>
      </Button>
      <Button
        variant="outlined"
        sx={{ color: '#e43ec2', borderColor: '#e43ec2' }}
        onClick={() => hanedlePageTransition('/place/hokkaido-art')}
      >
        <b>北海道</b>の<b>美術館</b>
      </Button>
      <Button
        variant="outlined"
        sx={{ color: '#32b3d5', borderColor: '#32b3d5' }}
        onClick={() => hanedlePageTransition('/place/hokkaido-aquarium')}
      >
        <b>北海道</b>の<b>水族館</b>
      </Button>
      <Button
        variant="outlined"
        sx={{
          color: '#3e42e4',
          borderColor: '#3e42e4',
        }}
        onClick={() => hanedlePageTransition('/place/hokkaido-zoo')}
      >
        <b>北海道</b>の<b>動物園</b>
      </Button>
    </Stack>
  );
}
