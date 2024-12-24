import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { useAtom } from 'jotai';
import { favoriteFacilitiesAtom } from '@/store/atoms';
import { MouseEvent, useState } from 'react';
import { AllFacilityProps } from '@/types';
import FacilityDrawer from '@/components/parts/facility-card/FacilityDrawer';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const FacilityCardTopImage = ({
  facility,
}: {
  facility: AllFacilityProps;
}) => {
  // お気に入り施設
  const [favoriteFacilities, setFavoriteFacilities] = useAtom(
    favoriteFacilitiesAtom
  );
  const handleFavoriteFacilities = (
    e: MouseEvent<HTMLButtonElement>,
    facility: AllFacilityProps
  ) => {
    e.stopPropagation();
    if (
      favoriteFacilities.some(
        (favoriteFacility) => favoriteFacility.id === facility.id
      )
    ) {
      setFavoriteFacilities((prev) => {
        return prev.filter(
          (favoriteFacility) => favoriteFacility.id !== facility.id
        );
      });
      localStorage.setItem(
        'favoriteFacilities',
        JSON.stringify(
          favoriteFacilities.filter(
            (favoriteFacility) => favoriteFacility.id !== facility.id
          )
        )
      );
    } else {
      setFavoriteFacilities((prev) => {
        return [...prev, facility];
      });
      localStorage.setItem(
        'favoriteFacilities',
        JSON.stringify([...favoriteFacilities, facility])
      );
    }
  };

  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const parseAddress = (address: string) => {
    if (!address) {
      throw new Error('Address is required');
    }

    // 「都」「道」「府」「県」で分割
    const prefectureIndex = address.search(/都|道|府|県/);
    if (prefectureIndex === -1) {
      throw new Error('Invalid address format');
    }

    const prefecture = address.slice(0, prefectureIndex + 1); // 都道府県部分
    const remainingAddress = address.slice(prefectureIndex + 1);

    // 「市」「区」「町」「村」「郡」で分割
    const cityIndex = remainingAddress.search(/市|区|町|村|郡/);
    if (cityIndex === -1) {
      throw new Error('City not found in address');
    }

    const city = remainingAddress.slice(0, cityIndex + 1); // 市区町村部分
    const rest = remainingAddress.slice(cityIndex + 1); // 残りの住所

    return { prefecture, city, rest };
  };

  return (
    <>
      <Grid2
        size={{ xs: 6, md: 3 }}
        key={facility.id}
        sx={{ position: 'relative' }}
      >
        {facility.isClosed && (
          <Box
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 1,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: 20,
            }}
          >
            {facility.type === 'zoo' ? '閉園' : '閉館'}しました
          </Box>
        )}
        <Card
          sx={{
            p: '4px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative',
            '&:hover': {
              boxShadow:
                '0px 3px 1px -1px rgba(0,0,0,0.4),0px 1px 2px 0px rgba(0,0,0,0.3),0px 1px 4px 0px rgba(0,0,0,0.3)',
            },
          }}
        >
          {
            // favoriteFacilitiesに存在するかどうかでお気に入りアイコンの表示を切り替え
            favoriteFacilities.some(
              (favoriteFacility) => favoriteFacility.id === facility.id
            ) ? (
              <IconButton
                size="small"
                onClick={(e) => handleFavoriteFacilities(e, facility)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'warning.main',
                }}
              >
                <StarIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                onClick={(e) => handleFavoriteFacilities(e, facility)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <StarBorderIcon />
              </IconButton>
            )
          }
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              alt="施設写真"
              image={facility.image || '/img/noimage.png'}
              onClick={toggleDrawer('bottom', true)}
              sx={{
                aspectRatio: '5 / 4',
                width: '100%',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
            <Box
              sx={{
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 0,
                left: 0,
                bottom: 5,
                m: 'auto',
                textAlign: 'center',
              }}
            >
              <Button
                size="small"
                onClick={toggleDrawer('bottom', true)}
                sx={{
                  backgroundColor: 'rgba(66, 66, 66, 0.4)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: 11,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                詳細を開く
              </Button>
            </Box>
          </Box>
          <CardContent
            sx={{ p: '4px !important', width: '100%', height: '100%' }}
          >
            <Box
              sx={{
                flexShrink: 0,
                py: '2px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                {facility.name}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  mt: 'auto',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: 11 }}>
                  {`${parseAddress(facility.address).prefecture}${
                    parseAddress(facility.address).city
                  }`}
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
      <Drawer
        anchor={'bottom'}
        open={state['bottom']}
        onClose={toggleDrawer('bottom', false)}
        sx={{
          '& .MuiPaper-root': {
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          },
        }}
      >
        {FacilityDrawer('bottom', toggleDrawer, facility)}
      </Drawer>
    </>
  );
};
