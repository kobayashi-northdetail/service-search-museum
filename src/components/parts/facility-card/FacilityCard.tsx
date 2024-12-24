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

export const FacilityCard = ({ facility }: { facility: AllFacilityProps }) => {
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

  return (
    <>
      <Grid2
        size={{ xs: 12, md: 6 }}
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
          <CardMedia
            component="img"
            alt="施設写真"
            image={facility.image || '/img/noimage.png'}
            onClick={toggleDrawer('bottom', true)}
            sx={{
              aspectRatio: '5 / 4',
              width: '40%',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <CardContent
            sx={{ p: '8px 20px 8px 16px !important', width: '100%' }}
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
              <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }}>
                {facility.name}
              </Typography>
              <Stack direction="column" sx={{ height: '100%' }}>
                <Typography sx={{ fontSize: 13 }}>
                  〒{facility.postCode}
                </Typography>
                <Typography sx={{ fontSize: 13 }}>
                  {facility.address}
                </Typography>
                <Box sx={{ alignSelf: 'flex-end', mt: 'auto' }}>
                  <Button
                    size="small"
                    onClick={toggleDrawer('bottom', true)}
                    sx={{
                      fontSize: 12,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      transform: 'translate(20px, 10px)',
                    }}
                  >
                    詳細を開く
                  </Button>
                </Box>
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
