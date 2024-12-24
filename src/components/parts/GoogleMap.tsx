/* ===============================================
  GoogleMapからLeafletに変更したため、このファイルは削除予定
================================================= */

// 'use client';

// import '@/assets/css/GoogleMap.scss';

// import { Box, Button, CardMedia, Stack, Typography } from '@mui/material';
// import { useEffect } from 'react';

// import { useAtom, useAtomValue } from 'jotai';
// import {
//   displayMuseumsAtom,
//   mapCurrentPositionAtom,
//   mapZoomAtom,
// } from '@/store/atoms';
// import { MarkerClusterer, GridAlgorithm } from '@googlemaps/markerclusterer';
// import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';
// import { renderToString } from 'react-dom/server';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }

// type Location = {
//   id: number | string;
//   type: string;
//   name: string;
//   postCode: string;
//   address: string;
//   image: string;
//   url: string;
// };

// const mapStyles = [
//   {
//     elementType: 'labels.icon',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text',
//     stylers: [
//       {
//         color: '#757575',
//       },
//       {
//         visibility: 'simplified',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.land_parcel',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.locality',
//     stylers: [
//       {
//         visibility: 'simplified',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.business',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.icon',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway.controlled_access',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road.local',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'road.local',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'simplified',
//       },
//     ],
//   },
// ];

// export default function GoogleMap({ isDetail, facility }) {
//   const { queryFacilityName } = useCustomSearchParams();
//   // 住所から座標を取得してマップにピンを追加
//   // マーカーを管理する配列を作成
//   const addMarkersFromAddresses = async (
//     map: google.maps.Map,
//     locations: Location[],
//     queryFacilityName?: string
//   ) => {
//     const geocoder = new google.maps.Geocoder();
//     const markers: google.maps.Marker[] = []; // マーカーを保存する配列を追加

//     for (const location of locations) {
//       try {
//         const response = await geocoder.geocode({
//           address: location.address,
//         });
//         if (response.results[0]) {
//           const position = response.results[0].geometry.location;

//           let icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
//           if (location.type === 'art') {
//             icon = '/icon/art.png';
//           } else if (location.type === 'zoo') {
//             icon = '/icon/zoo.png';
//           } else if (location.type === 'aquarium') {
//             icon = '/icon/aquarium.png';
//           } else if (location.type === 'museum') {
//             icon = '/icon/museum.png';
//           }

//           const marker = new google.maps.Marker({
//             position,
//             map,
//             title: location.name,
//             icon: {
//               url: icon,
//               scaledSize: new google.maps.Size(32, 32),
//             },
//           });

//           const infoWindow = new google.maps.InfoWindow({
//             content: renderToString(<InfoWindow location={location} />),
//           });

//           marker.addListener('click', () => {
//             // クリックしたらInfoWindowが非表示なら表示、表示なら非表示
//             if (infoWindow.getPosition()) {
//               infoWindow.close();
//             } else {
//               infoWindow.open(map, marker);
//             }
//           });
//           if (queryFacilityName && location.name === queryFacilityName) {
//             infoWindow.open(map, marker);
//           }

//           // 配列に追加
//           markers.push(marker);
//         }
//       } catch (error) {
//         console.error(`Error geocoding address ${location.address}:`, error);
//       }
//     }

//     // マーカーのクラスタリングを有効にする
//     // カスタムアイコンをRendererオプションに渡してクラスタリング
//     new MarkerClusterer({
//       map,
//       markers,
//       algorithm: new GridAlgorithm({ maxDistance: 4000 }),
//     });
//   };

//   // 現在地を表示
//   const displayUserLocation = (map: google.maps.Map) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           // 現在地のマーカーを追加
//           /* eslint-disable */
//           const userMarker = new google.maps.Marker({
//             /* eslint-enable */
//             position: userLocation,
//             map,
//             title: '現在地',
//             icon: {
//               path: google.maps.SymbolPath.CIRCLE,
//               fillColor: '#115EC3',
//               fillOpacity: 1,
//               strokeColor: 'white',
//               strokeWeight: 2,
//               scale: 7,
//             },
//           });

//           // InfoWindowを現在地に追加
//           // const infoWindow = new google.maps.InfoWindow({
//           //   content: "<p style='font-size: 14px'>現在地</p>",
//           // });
//           // infoWindow.open(map, userMarker);
//           // マーカーをクリックしたらInfoWindowを再度表示
//           // userMarker.addListener('click', () => {
//           //   infoWindow.open(map, userMarker);
//           // });

//           // 現在地に地図を中央に
//           // map.setCenter(userLocation);
//           // map.setZoom(11);
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };

//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
//   const displayMuseums = useAtomValue(displayMuseumsAtom);
//   const [mapCurrentPosition, setMapCurrentPosition] = useAtom(
//     mapCurrentPositionAtom
//   );
//   const [mapZoom, setMapZoom] = useAtom(mapZoomAtom);
//   useEffect(() => {
//     // Google Maps APIスクリプトを追加
//     const addGoogleMapsScript = () => {
//       if (document.getElementById('google-maps-script')) {
//         window.initMap();
//         return;
//       }

//       const script = document.createElement('script');
//       script.id = 'google-maps-script';
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly&callback=initMap&loading=async`;
//       script.async = true;
//       script.defer = true;
//       script.onerror = () =>
//         console.error('Google Maps APIの読み込みに失敗しました');
//       document.head.appendChild(script);
//     };

//     setTimeout(() => {
//       // 初期化用のグローバル関数を定義
//       window.initMap = function () {
//         const mapElement = document.getElementById('map');
//         if (mapElement) {
//           const intervalId = setInterval(() => {
//             const flag = document.getElementById('google-maps-script') !== null;
//             if (flag) {
//               clearInterval(intervalId);

//               const mapOptions = {
//                 center: mapCurrentPosition,
//                 zoom: mapZoom,
//                 styles: mapStyles,
//               };

//               const map = new google.maps.Map(
//                 document.getElementById('map') as HTMLElement,
//                 mapOptions
//               );
//               if (isDetail) {
//                 // 一覧のドロワーに表示する場合

//                 // 住所から座標を取得してマップにピンを追加
//                 addMarkersFromAddresses(map, [facility]);
//                 // 現在地を表示
//                 displayUserLocation(map);
//                 // 画面中央を住所の座標に移動
//                 // 住所は緯度経度に変換してセット
//                 const geocoder = new google.maps.Geocoder();
//                 geocoder.geocode(
//                   {
//                     address: facility.address,
//                   },
//                   (results, status) => {
//                     if (status === 'OK') {
//                       if (results && results[0]) {
//                         map.setCenter(results[0].geometry.location);
//                       } else {
//                         console.error('Geocode results are null or empty');
//                       }
//                       map.setZoom(7);
//                     } else {
//                       console.error(
//                         `Geocode was not successful for the following reason: ${status}`
//                       );
//                     }
//                   }
//                 );
//               } else if (queryFacilityName) {
//                 // 一覧から地図ページを表示で遷移してきた場合

//                 // 現在地を表示
//                 displayUserLocation(map);
//                 // 住所から座標を取得してマップにピンを追加
//                 addMarkersFromAddresses(map, displayMuseums, queryFacilityName);
//                 // displayMuseumsの中からqueryFacilityNameと一致するオブジェクトを取得
//                 const targetLocation = displayMuseums.find(
//                   (location) => location.name === queryFacilityName
//                 );
//                 // queryFacilityNameを緯度軽度に変換して画面中央に表示
//                 if (targetLocation) {
//                   const geocoder = new google.maps.Geocoder();
//                   geocoder.geocode(
//                     {
//                       address: targetLocation.address,
//                     },
//                     (results, status) => {
//                       if (status === 'OK') {
//                         if (results && results[0]) {
//                           map.setCenter(results[0].geometry.location);
//                         } else {
//                           console.error('Geocode results are null or empty');
//                         }
//                         map.setZoom(12);
//                       } else {
//                         console.error(
//                           `Geocode was not successful for the following reason: ${status}`
//                         );
//                       }
//                     }
//                   );
//                 }
//               } else {
//                 // 現在地を表示
//                 displayUserLocation(map);
//                 // 住所から座標を取得してマップにピンを追加
//                 addMarkersFromAddresses(map, displayMuseums);
//               }

//               // 動かすたびにmapCurrentPositionを更新
//               map.addListener('center_changed', () => {
//                 setMapCurrentPosition({
//                   lat: map.getCenter()?.lat() || 43.06417,
//                   lng: map.getCenter()?.lng() || 141.34694,
//                 });
//               });
//               // ズームレベルが変更されたらmapZoomを更新
//               map.addListener('zoom_changed', () => {
//                 setMapZoom(map.getZoom());
//               });
//             }
//           }, 100);
//         } else {
//           console.error('Map element not found');
//         }
//       };

//       addGoogleMapsScript();
//     }, 800);
//   }, [displayMuseums]);

//   return (
//     <Box sx={{ px: isDetail ? 0 : 2, mb: isDetail ? 0 : 4 }}>
//       <Box
//         id="map"
//         sx={{
//           height: isDetail ? { xs: '30vh', md: '25vw' } : '70vh',
//           width: '100%',
//         }}
//       />
//     </Box>
//   );
// }

// const InfoWindow = ({ location }) => {
//   return (
//     <Stack
//       id="infoWindow-detail"
//       sx={{
//         p: 2,
//         flexDirection: 'row',
//         gap: 2,
//       }}
//     >
//       <CardMedia
//         component="img"
//         alt="green iguana"
//         image={location.image || '/img/noimage.png'}
//         sx={{
//           aspectRatio: '5 / 4',
//           width: { xs: 'auto', md: '50%' },
//           maxHeight: { xs: '30vh', md: 'none' },
//           alignSelf: { xs: 'center', md: 'flex-start' },
//         }}
//       />
//       <Box
//         sx={{
//           alignSelf: { xs: 'center', md: 'auto' },
//           width: { xs: '100%', md: '50%' },
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 1,
//         }}
//       >
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mb: '4px' }}
//         >
//           <Typography
//             className="title"
//             sx={{ fontSize: 20, fontWeight: 'bold' }}
//           >
//             {location.name}
//           </Typography>
//         </Stack>
//         <Box sx={{ mb: 1 }}>
//           <Typography sx={{ fontSize: 14, color: '#333', lineHeight: 1.2 }}>
//             〒{location.postCode}
//           </Typography>
//           <Typography sx={{ fontSize: 14, color: '#333', lineHeight: 1.2 }}>
//             {location.address}
//           </Typography>
//         </Box>
//         <Box className="button-wrapper">
//           {location.url && (
//             <Button
//               component="a"
//               variant="outlined"
//               size="small"
//               href={location.url}
//               target="_blank"
//               endIcon={<OpenInNewIcon fontSize="small" />}
//               sx={{
//                 fontSize: 12,
//                 textecoration: 'none',
//                 alignSelf: 'flex-end',
//               }}
//             >
//               公式サイト
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Stack>
//   );
// };
