import Leaflet from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = Leaflet.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerIconShadow.src,
  iconSize: [15, 25], // アイコンのサイズを小さく
  iconAnchor: [7, 25], // アイコンのオフセットも合わせて調整
  popupAnchor: [0, -20], // ポップアップのオフセットも調整
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;