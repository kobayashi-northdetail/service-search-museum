import { AllAreaDataProps, AllFacilityProps, AreaCheckedItemsProps, CheckedItemsProps, City, MuseumTypesProps } from '@/types';
import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import dayjs from '@/libs/dayjsSetup';

export const allMuseumsAtom = atom<AllFacilityProps[]>([]);
export const displayMuseumsAtom = atom<AllFacilityProps[]>([]);
export const museumTypesAtom = atom<MuseumTypesProps[]>([
  {
    id: 'all',
    name: 'すべての施設',
    onClick: "handleMuseumTypesClick('all')",
    isSelected: false,
  },
  {
    id: 'favorite',
    name: 'お気に入り',
    onClick: "handleMuseumTypesClick('favorite')",
    isSelected: false,
  },
  {
    id: 'museum',
    name: '博物館',
    onClick: "handleMuseumTypesClick('museum')",
    isSelected: false,
  },
  {
    id: 'art',
    name: '美術館',
    onClick: "handleMuseumTypesClick('art')",
    isSelected: false,
  },
  {
    id: 'aquarium',
    name: '水族館',
    onClick: "handleMuseumTypesClick('aquarium')",
    isSelected: false,
  },
  {
    id: 'zoo',
    name: '動物園',
    onClick: "handleMuseumTypesClick('zoo')",
    isSelected: false,
  },
]);
export const checkedItemsAtom = atom<CheckedItemsProps>({
  museum: true,
  art: true,
  aquarium: true,
  zoo: true,
});
export const isLoadingAtom = atom(true);
export const favoriteFacilitiesAtom = atom<AllFacilityProps[]>([]);
export const mapCurrentPositionAtom = atom({ lat: 43.06417, lng: 141.34694 });
export const mapZoomAtom = atom(11);
export const searchValueAtom = atom('');
export const allAreaDataSelector = selectAtom(allMuseumsAtom, (allMuseums) => {
  const result = allMuseums.reduce((acc: AllAreaDataProps[], item: AllFacilityProps) => {
    // 都道府県と市区町村を正規表現で抽出
    const match = item.address.match(/(北海道|東京都|(?:京都|大阪)府|.*?[県])\s*(.+?[市区町村郡])/);
    if (!match) return acc; // マッチしなければスキップ

    const [_, prefecture, cityTown] = match; // eslint-disable-line

    // 都道府県を検索し、なければ追加
    let prefectureObj = acc.find((obj) => obj.prefecture === prefecture);
    if (!prefectureObj) {
        prefectureObj = { prefecture, cities: [] };
        acc.push(prefectureObj);
    }

    // 市区町村を検索し、なければ追加
    let cityObj = prefectureObj.cities.find((city) => city.name === cityTown);
    if (!cityObj) {
        cityObj = { name: cityTown, facilities: [] };
        prefectureObj.cities.push(cityObj);
    }

    // 施設情報を市区町村に追加
    cityObj.facilities.push({
        id: item.id,
        type: item.type,
        name: item.name,
        postCode: item.postCode,
        address: item.address,
        city: item.city,
        image: item.image,
        url: item.url,
        ...(item.isClosed !== undefined && { isClosed: item.isClosed })
    });

    return acc;
}, []);
  return result
});
export const areaDataSelector = selectAtom(displayMuseumsAtom, (displayMuseums) => {
  const result = displayMuseums.reduce((acc: AllAreaDataProps[], item: AllFacilityProps) => {
    // 都道府県と市区町村を正規表現で抽出
    const match = item.address.match(/(.*?[都道府県])\s*(.+?[市区町村郡])/);
    if (!match) return acc; // マッチしなければスキップ

    const [_, prefecture, cityTown] = match; // eslint-disable-line

    // 都道府県を検索し、なければ追加
    let prefectureObj = acc.find((obj) => obj.prefecture === prefecture);
    if (!prefectureObj) {
        prefectureObj = { prefecture, cities: [] };
        acc.push(prefectureObj);
    }

    // 市区町村を検索し、なければ追加
    let cityObj = prefectureObj.cities.find((city) => city.name === cityTown);
    if (!cityObj) {
        cityObj = { name: cityTown, city: item.city, facilities: [] };
        prefectureObj.cities.push(cityObj);
    }

    // 施設情報を市区町村に追加
    cityObj.facilities.push({
        id: item.id,
        type: item.type,
        name: item.name,
        postCode: item.postCode,
        address: item.address,
        city: item.city,
        image: item.image,
        url: item.url,
        ...(item.isClosed !== undefined && { isClosed: item.isClosed })
    });

    return acc;
  }, []);

  // resultの配列各要素のcitiesプロパティの配列を、cityのアルファベット順ソート
  result.forEach((prefecture) => {
    prefecture.cities.sort((a: City, b: City) => {
      if (!a.city || !b.city) return 0;
      if (a.city < b.city) return -1;
      if (a.city > b.city) return 1;
      return 0;
    });
  });
  return result
});
export const areaCheckedItemsAtom = atom<AreaCheckedItemsProps[]>([])
export const isAreaFilteringAtom = atom(false);
export const loginUserAtom = atom<Session | null>(null);
export const loginUserParamsSelector = selectAtom(loginUserAtom, (loginUser) => {
  return {
    id: {
      title: 'ユーザーID',
      value: loginUser?.user.id,
    },
    full_name: {
      title: 'ユーザー名',
      value: loginUser?.user.user_metadata.full_name,
    },
    email: {
      title: 'メールアドレス',
      value: loginUser?.user.email,
    },
    created_at: {
      title: '入会日',
      value: loginUser ? dayjs(loginUser.user.created_at).format('YYYY/MM/DD HH:mm:ss') : '',
    }
  }
});
export const isFacilityCardTopImageAtom = atom(true);