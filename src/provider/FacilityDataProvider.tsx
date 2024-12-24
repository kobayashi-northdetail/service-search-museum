'use client';

import { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  allMuseumsAtom,
  areaCheckedItemsAtom,
  checkedItemsAtom,
  displayMuseumsAtom,
  favoriteFacilitiesAtom,
  isLoadingAtom,
  loginUserAtom,
  museumTypesAtom,
  searchValueAtom,
} from '@/store/atoms';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';
import { AllFacilityProps } from '@/types';
import { supabase } from '@/libs/supabaseClient';

export default function FacilityDataProvider({
  allFacilitiesProps,
  children,
}: Readonly<{
  allFacilitiesProps: AllFacilityProps[];
  children: React.ReactNode;
}>) {
  const { queryFacilityType } = useCustomSearchParams();
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setDisplayMuseums = useSetAtom(displayMuseumsAtom);
  const [tmpDisplayMuseums, setTmpDisplayMuseums] = useState<
    AllFacilityProps[]
  >([]);
  const setMuseumTypes = useSetAtom(museumTypesAtom);
  const checkedItems = useAtomValue(checkedItemsAtom);
  const searchValue = useAtomValue(searchValueAtom);
  const areaCheckedItems = useAtomValue(areaCheckedItemsAtom);
  const [allMuseums, setAllMuseums] = useAtom(allMuseumsAtom);
  const [favoriteFacilities, setFavoriteFacilities] = useAtom(
    favoriteFacilitiesAtom
  );
  const setLoginUser = useSetAtom(loginUserAtom);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setLoginUser(session ?? null);
    });
    setAllMuseums(allFacilitiesProps);
    const favoriteFacilities = localStorage.getItem('favoriteFacilities');
    if (favoriteFacilities) {
      setFavoriteFacilities(JSON.parse(favoriteFacilities));
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    let setList: AllFacilityProps[] = [];
    if (queryFacilityType === 'museum') {
      const museums = allFacilitiesProps.filter(
        (facility) => facility.type === 'museum'
      );
      setList = museums;
    } else if (queryFacilityType === 'art') {
      const artMuseums = allFacilitiesProps.filter(
        (facility) => facility.type === 'art'
      );
      setList = artMuseums;
    } else if (queryFacilityType === 'zoo') {
      const zoos = allFacilitiesProps.filter(
        (facility) => facility.type === 'zoo'
      );
      setList = zoos;
    } else if (queryFacilityType === 'aquarium') {
      const aquariums = allFacilitiesProps.filter(
        (facility) => facility.type === 'aquarium'
      );
      setList = aquariums;
    } else if (queryFacilityType === 'favorite') {
      const lsFavoriteFacilities = localStorage.getItem('favoriteFacilities');
      if (lsFavoriteFacilities) {
        const parseLSFavoriteFacilities: AllFacilityProps[] =
          JSON.parse(lsFavoriteFacilities);
        // parseLSFavoriteFacilitiesのidとallFacilitiesPropsのidが一致するものだけを取得
        const matchedFavoriteFacilities = allFacilitiesProps.filter(
          (facility) =>
            parseLSFavoriteFacilities.some(
              (favoriteFacility) => favoriteFacility.id === facility.id
            )
        );
        setList = matchedFavoriteFacilities;
      }
    } else {
      setList = allFacilitiesProps;
    }
    setDisplayMuseums(setList);
    setTmpDisplayMuseums(setList);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    setMuseumTypes((prev) => {
      return prev.map((museumType) => {
        // queryFacilityTypeが空の場合はすべての施設が選択されている
        if (queryFacilityType === '') {
          museumType.isSelected = museumType.id === 'all';
        } else if (museumType.id === queryFacilityType) {
          museumType.isSelected = true;
        } else {
          museumType.isSelected = false;
        }
        return museumType;
      });
    });
  }, [queryFacilityType]);
  useEffect(() => {
    // checkedItemsの値が変更されたらtrueのものだけを表示
    // ただし、お気に入りが選択されている場合はfavoriteFacilitiesの中から表示
    const filteredDisplayMuseums = tmpDisplayMuseums
      .filter((museum) => {
        if (checkedItems.museum && museum.type === 'museum') {
          return true;
        }
        if (checkedItems.art && museum.type === 'art') {
          return true;
        }
        if (checkedItems.aquarium && museum.type === 'aquarium') {
          return true;
        }
        if (checkedItems.zoo && museum.type === 'zoo') {
          return true;
        }
        return false;
      })
      .filter((museum) => {
        //areaCheckedItemsのisCheckedがtrueのものだけを表示
        return areaCheckedItems.some((area) => {
          return museum.prefecture === area.prefecture && area.isChecked;
        });
      });
    setDisplayMuseums(
      filteredDisplayMuseums.filter((museum) => {
        if (queryFacilityType === 'favorite') {
          return favoriteFacilities.some(
            (favoriteFacility) => favoriteFacility.id === museum.id
          );
        }
        return true;
      })
    );
  }, [checkedItems, areaCheckedItems, tmpDisplayMuseums]);
  useEffect(() => {
    // allMuseumsから検索窓に入力された文字列で絞り込み
    // かつqueryFacilityTypeとcheckedItemsによる絞り込みを反映
    const matchedMuseums = allMuseums.filter((museum) => {
      if (searchValue === '') {
        return true;
      }
      // 大文字小文字を区別せずに検索
      return museum.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (matchedMuseums.length === 0) {
      setDisplayMuseums([]);
    } else {
      setDisplayMuseums(
        matchedMuseums.filter((museum) => {
          if (queryFacilityType === 'favorite') {
            return favoriteFacilities.some(
              (favoriteFacility) => favoriteFacility.id === museum.id
            );
          }
          if (queryFacilityType === 'museum') {
            return museum.type === 'museum';
          }
          if (queryFacilityType === 'art') {
            return museum.type === 'art';
          }
          if (queryFacilityType === 'zoo') {
            return museum.type === 'zoo';
          }
          if (queryFacilityType === 'aquarium') {
            return museum.type === 'aquarium';
          }
          return true;
        })
      );
    }
  }, [searchValue]);

  return <>{children}</>;
}
