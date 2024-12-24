import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  allAreaDataSelector,
  areaCheckedItemsAtom,
  checkedItemsAtom,
  museumTypesAtom,
  searchValueAtom,
} from '@/store/atoms';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { regions } from '@/settings/variables';

export function Search({
  handleSearchValue,
}: {
  handleSearchValue: (value: string) => void;
}) {
  const [tmpSearchValue, setTmpSearchValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  // 入力イベントの処理
  const handleTmpSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTmpSearchValue(event.target.value);

    // 日本語入力中でない場合にのみ直接更新
    if (!isComposing) {
      handleSearchValue(event.target.value);
    }
  };

  // Composition イベントのハンドリング
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => {
    setIsComposing(false);
    handleSearchValue(tmpSearchValue);
  };
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        name="search"
        placeholder="施設名を検索できます"
        sx={{ flexGrow: 1 }}
        value={tmpSearchValue}
        onChange={handleTmpSearchValue}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </FormControl>
  );
}

export default function FilterArea({ path }: { path: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const {
    queryFacilityType,
    queryIsAllAreaChecked,
    queryAreaCheckedItems,
    queryTypeCheckedItems,
  } = useCustomSearchParams();
  /* ==============================
   * Atom, Selector
   * ============================== */
  // 施設タイプ変更
  const [museumTypes, setMuseumTypes] = useAtom(museumTypesAtom);
  // 検索窓
  const setSearchValue = useSetAtom(searchValueAtom);
  // 全地域のデータ
  const allAreaData = useAtomValue(allAreaDataSelector);
  // 地域チェックボックス
  const [areaCheckedItems, setAreaCheckedItems] = useAtom(areaCheckedItemsAtom);
  // 施設タイプのチェックボックス
  const [typeCheckedItems, setTypeCheckedItems] = useAtom(checkedItemsAtom);

  /* ==============================
   * State
   * ============================== */
  // チェックされた都道府県
  const [checkedPrefectures, setCheckedPrefectures] = useState<string[]>(
    queryAreaCheckedItems
  );
  // 絞り込み解除ボタン表示非表示
  const [isFilteredList, setIsFilteredList] = useState(false);
  // 全選択・全解除のクエリパラメータ
  const queryIsAllAreaCheckedBool =
    queryIsAllAreaChecked === 'true' || queryIsAllAreaChecked === '';
  // 全選択・全解除のチェックボックス
  const [isAllAreaChecked, setIsAllAreaChecked] = useState(
    queryIsAllAreaCheckedBool
  );
  const [isExpanded, setIsExpanded] = useState(false);

  /* ==============================
   * ハンドラー関数
   * ============================== */
  const handleMuseumTypesClick = (clickType: string) => {
    setMuseumTypes((prev) => {
      return prev.map((museumType) => {
        if (museumType.id === clickType) {
          museumType.isSelected = true;
        } else {
          museumType.isSelected = false;
        }
        return museumType;
      });
    });

    if (clickType === 'all') {
      params.delete('facilityType');
      router.push(`/${path}?${params.toString()}`);
    } else {
      params.set('facilityType', clickType);
      router.push(`/${path}/?${params.toString()}`);
    }
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setTypeCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const handleAreaCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAreaCheckedItems((prev) =>
      prev.map((area) => {
        if (area.prefecture === name) {
          return { ...area, isChecked: checked };
        }
        return area;
      })
    );
  };
  const handleAccordionChange = () => {
    setIsExpanded(!isExpanded);
  };
  const handleAreaCheckboxChangeAll = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setAreaCheckedItems((prev) =>
      prev.map((area) => {
        return { ...area, isChecked: checked };
      })
    );
    setIsAllAreaChecked(checked);
  };
  // 絞り込み解除ボタン
  const handleFilterClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setTypeCheckedItems({
      museum: true,
      art: true,
      aquarium: true,
      zoo: true,
    });
    setAreaCheckedItems(
      allAreaData.map((area) => ({
        prefecture: area.prefecture,
        city: area.cities,
        isChecked: true,
      }))
    );
    setIsAllAreaChecked(true);
  };

  /* ==============================
   * 依存関係のあるuseEffect
   * ============================== */
  useEffect(() => {
    // queryTypeCheckedItemsがない場合は全選択
    if (queryTypeCheckedItems.length === 0) return;
    const newCheckedItems = queryTypeCheckedItems.reduce(
      (acc, type) => ({ ...acc, [type]: true }),
      { museum: false, art: false, aquarium: false, zoo: false }
    );
    setTypeCheckedItems(newCheckedItems);
  }, []);
  useEffect(() => {
    if (queryAreaCheckedItems.length > 0) {
      // queryAreaCheckedItemsが空でない場合は、チェックボックスを更新
      setAreaCheckedItems(
        allAreaData.map((area) => ({
          prefecture: area.prefecture,
          city: area.cities,
          isChecked: queryAreaCheckedItems.includes(area.prefecture),
        }))
      );
    } else if (
      queryIsAllAreaChecked === 'true' ||
      queryIsAllAreaChecked === ''
    ) {
      // queryAreaCheckedItemsが空で、queryIsAllAreaCheckedがtrueの場合は全選択
      setAreaCheckedItems(
        allAreaData.map((area) => ({
          prefecture: area.prefecture,
          city: area.cities,
          isChecked: true,
        }))
      );
    } else {
      // queryAreaCheckedItemsが空で、queryIsAllAreaCheckedがfalseの場合は全解除
      setAreaCheckedItems(
        allAreaData.map((area) => ({
          prefecture: area.prefecture,
          city: area.cities,
          isChecked: false,
        }))
      );
    }
  }, [allAreaData]);
  useEffect(() => {
    // チェックされた都道府県を更新
    setCheckedPrefectures(
      areaCheckedItems
        .filter((area) => area.isChecked)
        .map((area) => area.prefecture)
    );
  }, [areaCheckedItems]);
  useEffect(() => {
    // typeCheckedItems, areaCheckedItemsが全てtrueの場合は絞り込み解除ボタンを表示しない
    const isAllChecked = Object.values(typeCheckedItems).every(
      (value) => value
    );
    const isAllAreaChecked = areaCheckedItems.every((area) => area.isChecked);
    setIsFilteredList(!isAllChecked || !isAllAreaChecked);
  }, [typeCheckedItems, areaCheckedItems]);
  // クエリパラメータ操作
  useEffect(() => {
    if (checkedPrefectures.length === 0) {
      params.delete('areaCheckedItems');
      setIsAllAreaChecked(false);
    } else if (checkedPrefectures.length === areaCheckedItems.length) {
      params.delete('areaCheckedItems');
      setIsAllAreaChecked(true);
    } else {
      params.set('areaCheckedItems', checkedPrefectures.join(','));
    }
    const checkedItemKeys = Object.entries(typeCheckedItems)
      .filter(([, value]) => value)
      .map(([key]) => key);
    if (checkedItemKeys.length === 0) {
      params.delete('typeCheckedItems');
    } else {
      params.set('typeCheckedItems', checkedItemKeys.join(','));
    }
    params.set('isAllAreaChecked', isAllAreaChecked.toString());
    router.push(`?${params.toString()}`);
  }, [isAllAreaChecked, checkedPrefectures, typeCheckedItems]);

  /* ==============================
   * 地図ページのみの処理
   * ============================== */
  // URLが/mapで、かつfacilityNameのクエリがある場合
  const [isFilteredFacilityName, setIsFilteredFacilityName] = useState(false);
  const { queryFacilityName } = useCustomSearchParams();
  const currentPath = usePathname();
  useEffect(() => {
    if (currentPath === '/map/' && queryFacilityName) {
      setIsFilteredFacilityName(true);
    } else {
      setIsFilteredFacilityName(false);
    }
  }, [queryFacilityName, currentPath]);

  return (
    <Box>
      {/* スマホ用検索窓 */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
          mb: 3,
        }}
      >
        <Search handleSearchValue={handleSearchValue} />
        {/* <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton> */}
      </Box>
      {/* タイプ */}
      <Box sx={{ mb: 3 }}>
        {/* 施設タイプタブ */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            alignItems: { xs: 'start', md: 'center' },
            gap: 4,
            overflow: 'auto',
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              gap: 3,
              overflow: 'auto',
            }}
          >
            {museumTypes.map((museumType) => (
              <Chip
                key={museumType.id}
                onClick={() => handleMuseumTypesClick(museumType.id)}
                size="medium"
                label={museumType.name}
                sx={{
                  backgroundColor: museumType.isSelected
                    ? 'primary.main'
                    : 'transparent',
                  color: museumType.isSelected ? 'white' : 'text.primary',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
          {/* PC用検索窓 */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              gap: 1,
              width: { xs: '100%', md: 'fit-content' },
              overflow: 'auto',
            }}
          >
            <Search handleSearchValue={handleSearchValue} />
          </Box>
        </Box>
        <Accordion
          sx={{
            backgroundColor: isExpanded ? '#f0f0f0' : 'transparent',
            boxShadow: 'none',
            mt: '0 !important',
            borderRadius: 1,
            '&:before': { display: 'none' },
          }}
          expanded={isExpanded}
          onChange={handleAccordionChange}
        >
          <AccordionSummary
            sx={{
              borderBottom: 'none !important',
              borderRadius: 0,
              minHeight: 'auto !important',
              display: 'inline-flex',
              p: 0,
              '.MuiAccordionSummary-content': {
                m: '4px 0 !important',
              },
            }}
          >
            <Button
              variant={isExpanded ? 'outlined' : 'text'}
              sx={{ fontSize: 12 }}
              endIcon={
                isExpanded ? (
                  <ExpandLessIcon color="primary" fontSize="small" />
                ) : (
                  <ExpandMoreIcon color="primary" fontSize="small" />
                )
              }
            >
              <Box sx={{ minWidth: 58 }}>
                {isExpanded ? '閉じる' : '絞り込み検索'}
              </Box>
            </Button>
            <Button
              sx={{
                fontSize: 12,
                alignSelf: 'center',
                ml: 2,
                display: isFilteredList ? 'block' : 'none',
              }}
              variant="contained"
              size="small"
              onClick={handleFilterClear}
            >
              絞り込み解除
            </Button>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: '4px', px: 1 }}>
            {/* 施設タイプのチェックボックス */}
            <Box sx={{ mb: 2 }}>
              {(queryFacilityType === '' ||
                queryFacilityType === 'all' ||
                queryFacilityType === 'favorite') && (
                <Stack direction="row" alignItems="flex-start" gap={2}>
                  <Typography
                    sx={{ fontSize: 13, width: 75, flexShrink: 0, pt: '2px' }}
                  >
                    施設タイプ :
                  </Typography>
                  <FormGroup
                    row
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          name="museum"
                          checked={typeCheckedItems.museum}
                          onChange={handleCheckboxChange}
                          sx={{ p: '2px' }}
                        />
                      }
                      label="博物館"
                      sx={{ '.MuiTypography-root': { fontSize: 13 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          name="art"
                          checked={typeCheckedItems.art}
                          onChange={handleCheckboxChange}
                          sx={{ p: '2px' }}
                        />
                      }
                      label="美術館"
                      sx={{ '.MuiTypography-root': { fontSize: 13 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          name="aquarium"
                          checked={typeCheckedItems.aquarium}
                          onChange={handleCheckboxChange}
                          sx={{ p: '2px' }}
                        />
                      }
                      label="水族館"
                      sx={{ '.MuiTypography-root': { fontSize: 13 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          name="zoo"
                          checked={typeCheckedItems.zoo}
                          onChange={handleCheckboxChange}
                          sx={{ p: '2px' }}
                        />
                      }
                      label="動物園"
                      sx={{ '.MuiTypography-root': { fontSize: 13 } }}
                    />
                  </FormGroup>
                </Stack>
              )}
            </Box>
            {/* 地域 */}
            <Box>
              <Stack direction="row" alignItems="flex-start" gap={2}>
                <Typography
                  sx={{
                    fontSize: 13,
                    width: { xs: 40, md: 75 },
                    flexShrink: 0,
                    pt: '2px',
                  }}
                >
                  地域 :
                </Typography>
                <FormGroup
                  row
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                >
                  <Box sx={{ width: '100%' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          name={'全都道府県'}
                          checked={isAllAreaChecked}
                          onChange={handleAreaCheckboxChangeAll}
                          sx={{
                            p: '2px',
                            display: 'none',
                            color: isAllAreaChecked ? 'red' : 'primary.main',
                            '&.Mui-checked': {
                              color: isAllAreaChecked ? 'red' : 'primary.main',
                            },
                          }}
                        />
                      }
                      label={isAllAreaChecked ? '全解除' : '全選択'}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid',
                        borderColor: isAllAreaChecked
                          ? 'rgb(207, 66, 66)'
                          : 'primary.main',
                        borderRadius: '4px',
                        padding: '2px 4px',
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: isAllAreaChecked
                          ? 'rgb(207, 66, 66)'
                          : 'primary.main',
                        cursor: 'pointer',
                        ':hover': {
                          backgroundColor: isAllAreaChecked
                            ? 'rgba(207, 66, 66, 0.1)'
                            : 'rgba(0, 0, 255, 0.1)',
                        },
                        '.MuiTypography-root': {
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      }}
                    />
                  </Box>
                  {regions.map((region) => (
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      gap={{ xs: 1, md: 2 }}
                      key={region.id}
                      sx={{
                        width: '100%',
                      }}
                    >
                      {/* 地方名を表示 */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          mr: 2,
                          ml: { xs: '-16px', md: 0 },
                          width: '5rem',
                        }}
                      >
                        {region.region}
                      </Typography>
                      {/* 都道府県をマッピング */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {region.prefectures.map((prefecture) => {
                          const area = areaCheckedItems.find(
                            (item) => item.prefecture === prefecture
                          );
                          return (
                            <FormControlLabel
                              key={prefecture}
                              control={
                                <Checkbox
                                  size="small"
                                  name={prefecture}
                                  checked={area?.isChecked || false}
                                  onChange={handleAreaCheckboxChange}
                                  sx={{ p: '2px' }}
                                />
                              }
                              label={prefecture}
                              sx={{
                                '.MuiTypography-root': {
                                  fontSize: 13,
                                  mt: '2px',
                                },
                              }}
                            />
                          );
                        })}
                      </Box>
                    </Stack>
                  ))}
                </FormGroup>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        {isFilteredFacilityName && (
          <Box sx={{ textAlign: 'right' }}>
            <Button
              sx={{
                fontSize: 12,
                alignSelf: 'center',
                ml: 2,
              }}
              variant="contained"
              size="small"
              component="a"
              href="/map"
            >
              全ての施設を表示する
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
