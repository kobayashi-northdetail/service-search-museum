import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster';
import '@/libs/initLeaflet';
import { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useAtomValue } from 'jotai';
import { allMuseumsAtom, displayMuseumsAtom } from '@/store/atoms';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';
import { renderToString } from 'react-dom/server';
import '@/assets/css/map.scss';
import { AllFacilityProps } from '@/types';

const markerClusterGroup = L.markerClusterGroup();

interface Marker {
  position: [number, number];
  // info: string;
  property: AllFacilityProps; // Add this line to include the property field
}

/* ================================
  全画面表示ボタン
================================== */
function FullscreenButton({
  mapContainerRef,
}: {
  mapContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (mapContainerRef.current) {
      // 型キャストしてブラウザ互換性のあるメソッドを取得
      const requestFullscreen =
        mapContainerRef.current.requestFullscreen ||
        (
          mapContainerRef.current as HTMLDivElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen ||
        (
          mapContainerRef.current as HTMLDivElement & {
            mozRequestFullScreen?: () => Promise<void>;
          }
        ).mozRequestFullScreen ||
        (
          mapContainerRef.current as HTMLDivElement & {
            msRequestFullscreen?: () => Promise<void>;
          }
        ).msRequestFullscreen;

      const exitFullscreen =
        document.exitFullscreen ||
        (document as Document & { webkitExitFullscreen?: () => Promise<void> })
          .webkitExitFullscreen ||
        (document as Document & { mozCancelFullScreen?: () => Promise<void> })
          .mozCancelFullScreen ||
        (document as Document & { msExitFullscreen?: () => Promise<void> })
          .msExitFullscreen;

      if (!document.fullscreenElement && requestFullscreen) {
        // フルスクリーンを有効化
        requestFullscreen.call(mapContainerRef.current);
        mapContainerRef.current.classList.add('fullscreen');
        setIsFullscreen(true);
      } else if (document.fullscreenElement && exitFullscreen) {
        // フルスクリーンを解除
        exitFullscreen.call(document);
        mapContainerRef.current.classList.remove('fullscreen');
        setIsFullscreen(false);
      } else {
        // フォールバック：CSSクラスでフルスクリーンシミュレート
        if (!isFullscreen) {
          mapContainerRef.current.classList.add('fullscreen');
          setIsFullscreen(true);
        } else {
          mapContainerRef.current.classList.remove('fullscreen');
          setIsFullscreen(false);
        }
      }
    }
  };

  return (
    <IconButton
      onClick={toggleFullscreen}
      style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
    >
      <Avatar>
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </Avatar>
    </IconButton>
  );
}

/* ================================
  インフォウィンドウ
================================== */
const InfoWindow = ({ location }: { location: AllFacilityProps }) => {
  return (
    <Stack
      id="infoWindow-detail"
      sx={{
        p: 2,
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={location.image || '/img/noimage.png'}
        sx={{
          aspectRatio: '5 / 4',
          width: { xs: 'auto', md: '50%' },
          maxHeight: { xs: '30vh', md: 'none' },
          alignSelf: { xs: 'center', md: 'flex-start' },
        }}
      />
      <Box
        sx={{
          alignSelf: { xs: 'center', md: 'auto' },
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: '4px' }}
        >
          <Typography
            className="title"
            sx={{ fontSize: 20, fontWeight: 'bold' }}
          >
            {location.name || ''}
          </Typography>
        </Stack>
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: 14, color: '#333', lineHeight: 1.2 }}>
            〒{location.postCode || ''}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#333', lineHeight: 1.2 }}>
            {location.address || ''}
          </Typography>
        </Box>
        <Box className="button-wrapper">
          <Button
            className="googleMapButton"
            variant="outlined"
            size="small"
            sx={{
              fontSize: 12,
              textDecoration: 'none',
              textTransform: 'none',
            }}
          >
            Google Mapで開く
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

/* ================================
  マーカークラスター
================================== */
function MarkerCluster({ markers }: { markers: Marker[] }) {
  const map = useMap();

  useEffect(() => {
    markerClusterGroup.clearLayers();
    markers.forEach((marker) => {
      const popupContent = renderToString(
        <InfoWindow location={marker.property} />
      );

      const leafletMarker = L.marker(marker.position).bindPopup(popupContent, {
        autoPan: true,
        autoPanPadding: L.point(50, 50), // 上下左右に50pxのマージンを追加
      });

      // ポップアップを開いたときに、クリックした施設の緯度を基準に中心を下げる
      leafletMarker.on('popupopen', (e) => {
        const [lat, lng] = marker.position; // ループ変数のmarker.positionをクロージャでキャプチャ
        const offsetLat =
          map.containerPointToLatLng([0, 100]).lat -
          map.containerPointToLatLng([0, 0]).lat;
        map.setView([lat - offsetLat, lng], map.getZoom());

        // ポップアップを開いたこの要素のクラス名googleMapButtonを持つ要素を取得
        const popupElement = e.popup.getElement();
        // TODO: ここでgoogleMapButtonを取得して、クリックイベントを設定しているが、もし取得できなかった場合の処理が必要
        if (popupElement) {
          const googleMapButton =
            popupElement.querySelector('.googleMapButton');
          if (googleMapButton) {
            googleMapButton.addEventListener('click', () => {
              const placeName = encodeURIComponent(marker.property.name);
              const address = encodeURIComponent(marker.property.address);
              const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${placeName}+${address}`;
              window.open(googleMapUrl, '_blank');
            });
          }
        }
      });

      markerClusterGroup.addLayer(leafletMarker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [markers, map]);

  return null;
}

/* ================================
  動的に地図の中心を設定するコンポーネント
================================== */
function SetMapCenter({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setZoom(zoom); // zoomが変更されたときに地図のズームを設定
    map.setView(center); // centerが変更されたときに地図の中心を設定
  }, [center, zoom, map]);

  return null;
}

/* ================================
  マップコンポーネント
================================== */
export default function LeafletMap({
  facility,
}: {
  facility?: AllFacilityProps;
}) {
  const [center, setCenter] = useState<LatLngExpression>([43.06417, 141.34694]);
  // const [zoom, setZoom] = useState(8); // zoomを変更したい場合はここを変更
  const zoom = 8;

  // markersの情報を整形
  const allMuseums = useAtomValue(allMuseumsAtom);
  const { queryFacilityName } = useCustomSearchParams();

  const displayMuseums = useAtomValue(displayMuseumsAtom);
  const [markers, setMarkers] = useState<Marker[]>([]);
  useEffect(() => {
    // queryFacilityNameが存在する場合、該当施設のデータを取得
    if (queryFacilityName) {
      const targetFacility = allMuseums.find(
        (museum) => museum.name === queryFacilityName
      );
      if (targetFacility) {
        // 該当施設のデータでマーカーを設定し、中心とズームを調整
        setMarkers([
          {
            position: [Number(targetFacility.lat), Number(targetFacility.lng)],
            property: targetFacility,
          },
        ]);
        setCenter([Number(targetFacility.lat), Number(targetFacility.lng)]);
      }
    } else if (facility) {
      // 詳細ドロワー用のマップ表示
      // facilityが存在する場合、facilityの情報のみをマーカーとして設定
      setMarkers([
        {
          position: [Number(facility.lat), Number(facility.lng)],
          property: facility,
        },
      ]);
      setCenter([Number(facility.lat), Number(facility.lng)]);
    } else {
      // facilityがない場合、displayMuseumsからマーカーを設定
      const newMarkers = displayMuseums.map((museum) => ({
        position: [Number(museum.lat), Number(museum.lng)] as [number, number],
        property: museum,
      }));
      setMarkers(newMarkers);
    }
  }, [facility, displayMuseums]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box ref={containerRef} style={{ position: 'relative', height: '100%' }}>
      {/* FullscreenButtonに親要素のrefを渡す */}
      <FullscreenButton mapContainerRef={containerRef} />
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SetMapCenter center={center} zoom={zoom} />
        <MarkerCluster markers={markers} />
      </MapContainer>
    </Box>
  );
}
