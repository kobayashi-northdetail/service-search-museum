'use client';

import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import { useAtom, useAtomValue } from 'jotai';
import {
  displayMuseumsAtom,
  isFacilityCardTopImageAtom,
  isLoadingAtom,
} from '@/store/atoms';
import FilterArea from './FilterArea';
import { FacilityCard } from './facility-card/FacilityCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { FacilityCardTopImage } from './facility-card/FacilityCardTopImage';
import HorizontalCardIcon from '@/assets/svg/HorizontalCardIcon';
import VerticalCardIcon from '@/assets/svg/VerticalCardIcon';

export default function MainContent() {
  const displayMuseums = useAtomValue(displayMuseumsAtom);
  const isLoding = useAtomValue(isLoadingAtom);
  const [isFacilityCardTopImage, setIsFacilityCardTopImage] = useAtom(
    isFacilityCardTopImageAtom
  );

  // ぺージネーション
  const [cardLimit, setCardLimit] = useState(20);
  const handleCardLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setCardLimit(Number(e.target.value));
  };
  const paginationCount = Math.ceil(displayMuseums.length / cardLimit);
  const [cuurentPage, setCurrentPage] = useState(1);
  const handleCurrentPage = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [cardLimit, displayMuseums]);

  // カードタイプ
  const [cardType, setCardType] = useState('vertical');
  const handleCardType = (e: ChangeEvent<HTMLInputElement>) => {
    setCardType(e.target.value);
  };
  useEffect(() => {
    setIsFacilityCardTopImage(cardType === 'vertical');
  }, [cardType]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FilterArea path="facilities" />
      {!isLoding && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
        >
          <Stack direction="row" mb={'6px'}>
            <Typography
              sx={{
                mr: 1,
                lineHeight: 1,
                fontSize: '0.8em',
                alignSelf: 'flex-end',
              }}
            >
              該当件数 :
            </Typography>
            <Typography sx={{ fontWeight: 'bold', lineHeight: 1 }}>
              {displayMuseums.length}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8em',
                alignSelf: 'flex-end',
                lineHeight: 1,
                ml: 1,
              }}
            >
              件
            </Typography>
          </Stack>
          <Stack sx={{ gap: 1, alignItems: 'flex-end' }}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormLabel
                id="limit-count-label"
                sx={{
                  mr: 1,
                  flexShrink: 0,
                  color: 'rgba(0, 0, 0, 0.87) !important',
                  fontSize: '0.8em',
                }}
              >
                カード :
              </FormLabel>
              <RadioGroup
                aria-labelledby="limit-count-label"
                defaultValue="vertical"
                name="limit-count-group"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: '1px solid #b6b6b6',
                  width: '100%',
                  flexWrap: 'nowrap',
                }}
                onChange={handleCardType}
              >
                {['horizontal', 'vertical'].map((value, index, array) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio
                        sx={{
                          width: '100%',
                          height: '60px',
                          opacity: 0,
                          position: 'absolute',
                        }}
                      />
                    }
                    label={
                      value === 'horizontal' ? (
                        <HorizontalCardIcon />
                      ) : (
                        <VerticalCardIcon />
                      )
                    }
                    sx={{
                      flex: 1,
                      position: 'relative',
                      m: 0,
                      '& .MuiFormControlLabel-label': {
                        color: '#b6b6b6',
                        width: { xs: '40px', sm: '48px' },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        background: '#fff',
                        borderRight:
                          index < array.length - 1
                            ? '1px solid #b6b6b6'
                            : 'none', // 最後の要素でボーダーを消す
                      },
                      '& .Mui-checked + .MuiFormControlLabel-label': {
                        background: '#1976d2',
                        fontWeight: 500,
                        color: '#fff',
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormLabel
                id="limit-count-label"
                sx={{
                  mr: 1,
                  flexShrink: 0,
                  color: 'rgba(0, 0, 0, 0.87) !important',
                  fontSize: '0.8em',
                }}
              >
                表示件数 :
              </FormLabel>
              <RadioGroup
                aria-labelledby="limit-count-label"
                defaultValue="20"
                name="limit-count-group"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: '1px solid #b6b6b6',
                  width: '100%',
                  flexWrap: 'nowrap',
                }}
                onChange={handleCardLimit}
              >
                {['10', '20', '50'].map((value, index) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio
                        sx={{
                          width: '100%',
                          height: '60px',
                          opacity: 0,
                          position: 'absolute',
                        }}
                      />
                    }
                    label={value}
                    sx={{
                      flex: 1,
                      position: 'relative',
                      m: 0,
                      '& .MuiFormControlLabel-label': {
                        color: '#b6b6b6',
                        width: { xs: '40px', sm: '48px' },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        background: '#fff',
                        borderRight: index < 2 ? '1px solid #b6b6b6' : 'none',
                      },
                      '& .Mui-checked + .MuiFormControlLabel-label': {
                        background: '#1976d2',
                        fontWeight: 500,
                        color: '#fff',
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
      )}
      {/* 施設一覧 */}
      {isLoding ? (
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
        <Grid2
          container
          spacing={isFacilityCardTopImage ? '4px' : 2}
          columns={12}
        >
          {!!displayMuseums.length ? (
            displayMuseums
              .slice((cuurentPage - 1) * cardLimit, cuurentPage * cardLimit)
              .map((facility) =>
                isFacilityCardTopImage ? (
                  <FacilityCardTopImage facility={facility} key={facility.id} />
                ) : (
                  <FacilityCard facility={facility} key={facility.id} />
                )
              )
          ) : (
            <Box sx={{ mx: 3 }}>
              <Typography sx={{ fontSize: 14 }}>登録がありません</Typography>
            </Box>
          )}
        </Grid2>
      )}
      {/* ページネーション */}
      {!!displayMuseums.length && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            color="primary"
            count={paginationCount}
            page={cuurentPage}
            onChange={(_, page) => handleCurrentPage(_, page)}
            sx={{ '.MuiPagination-ul': { flexWrap: 'nowrap' } }}
          />
        </Box>
      )}
    </Box>
  );
}
