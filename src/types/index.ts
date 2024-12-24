// Atoms
export type AllFacilityProps = {
  id: string;
  type: string;
  name: string;
  prefecture?: string;
  postCode: string;
  address: string;
  city: string;
  image: string;
  url: string;
  latlng?: string;
  lat?: string | number;
  lng?: string | number;
  isClosed?: boolean | string;
};
export type MuseumTypesProps = {
  id: string,
  name: string
  onClick: string,
  isSelected: boolean
}
export type CheckedItemsProps = {
  museum: boolean,
  art: boolean,
  aquarium: boolean,
  zoo: boolean
}
// 市区町村の型
export interface City {
  name: string;
  city?: string;
  facilities: AllFacilityProps[];
}
// 都道府県の型
export interface AllAreaDataProps {
  prefecture: string;
  cities: City[];
}
// エリアチェックアイテムの型
export interface AreaCheckedItemsProps {
  prefecture: string;
  city: City[];
  isChecked: boolean;
}