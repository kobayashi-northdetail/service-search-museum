'use client';

import { allMuseumsAtom, isLoadingAtom } from '@/store/atoms';
import {
  Box,
  Button,
  CircularProgress,
  Container,
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
import { FacilityCard } from '../parts/facility-card/FacilityCard';
import { ChangeEvent, useEffect, useState } from 'react';

type PrefectureData = {
  name: string;
};

type CategoryData = {
  id: string;
  name: string;
};

export default function Types({
  prefectureData,
  categoryData,
}: {
  prefectureData: PrefectureData;
  categoryData: CategoryData;
}) {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const allMuseums = useAtomValue(allMuseumsAtom);
  const displayMuseumsWithCategory = allMuseums.filter(
    (museum) =>
      museum.prefecture === prefectureData.name &&
      museum.type === categoryData.id
  );

  // 前のページへ戻る
  const handleBackPage = () => {
    window.history.back();
  };

  // ぺージネーション
  const [cardLimit, setCardLimit] = useState(20);
  const handleCardLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setCardLimit(Number(e.target.value));
  };
  const paginationCount = Math.ceil(
    displayMuseumsWithCategory.length / cardLimit
  );
  const [cuurentPage, setCurrentPage] = useState(1);
  const handleCurrentPage = (_: ChangeEvent<unknown>, page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [cardLimit]);

  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12, mb: 10 }}>
        <Stack
          component="h2"
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          gap={1}
          sx={{ mt: 3, mb: 5 }}
        >
          <Typography
            component="span"
            gutterBottom
            sx={{ fontSize: 28, mb: 0 }}
          >
            {prefectureData.name}
          </Typography>
          <Typography
            component="span"
            gutterBottom
            sx={{ fontSize: 22, mb: 0 }}
          >
            の
          </Typography>
          <Typography
            component="span"
            gutterBottom
            sx={{ fontSize: 28, mb: 0 }}
          >
            {categoryData.name}
          </Typography>
          <Typography
            component="span"
            gutterBottom
            sx={{ fontSize: 22, mb: 0 }}
          >
            一覧
          </Typography>
        </Stack>
        <Box>
          {isLoading ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 310,
                }}
              >
                <CircularProgress />
              </Box>
            </>
          ) : (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
              >
                <Stack direction="row">
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
                    {displayMuseumsWithCategory.length}
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
                            borderRight:
                              index < 2 ? '1px solid #b6b6b6' : 'none',
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
              <Grid2 container spacing={2} columns={12}>
                {displayMuseumsWithCategory.length ? (
                  displayMuseumsWithCategory
                    .slice(
                      (cuurentPage - 1) * cardLimit,
                      cuurentPage * cardLimit
                    )
                    .map((facility) => (
                      <FacilityCard facility={facility} key={facility.id} />
                    ))
                ) : (
                  <Box sx={{ mx: 3 }}>
                    <Typography sx={{ fontSize: 14 }}>
                      登録がありません
                    </Typography>
                  </Box>
                )}
              </Grid2>
            </>
          )}
          {/* ページネーション */}
          {!!displayMuseumsWithCategory.length && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                color="primary"
                count={paginationCount}
                page={cuurentPage}
                onChange={(_, page) => handleCurrentPage(_, page)}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="outlined" onClick={handleBackPage}>
            前のページへ戻る
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
