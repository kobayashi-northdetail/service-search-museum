'use client';

import { useSearchParams } from 'next/navigation';

export const useCustomSearchParams = () => {
  const searchParams = useSearchParams();
  // フリーワード
  const queryFacilityType = searchParams.get('facilityType') || '';
  // 住所
  const queryFacilityName = searchParams.get('facilityName') || '';
  // 都道府県全選択
  const queryIsAllAreaChecked = searchParams.get('isAllAreaChecked') || '';
  // フィルターの都道府県
  const tmpQueryAreaCheckedItems = searchParams.get('areaCheckedItems');
  const queryAreaCheckedItems = tmpQueryAreaCheckedItems
    ? tmpQueryAreaCheckedItems.split(',')
    : [];
  // フィルターの施設タイプ
  const tmpQueryTypeCheckedItems = searchParams.get('typeCheckedItems');
  const queryTypeCheckedItems = tmpQueryTypeCheckedItems
    ? tmpQueryTypeCheckedItems.split(',')
    : [];

  return {
    queryFacilityType,
    queryFacilityName,
    queryIsAllAreaChecked,
    queryAreaCheckedItems,
    queryTypeCheckedItems,
  };
};
