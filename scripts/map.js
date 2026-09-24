export function map() {
  const map = L.map("map", {
    center: [42.38, -71.1],
    zoom: 11,
    maxZoom: 18,
    minZoom: 11,
    maxBounds: [
      [42.8, -71.6],
      [42.0, -70.4],
    ],
    maxBoundsViscosity: 1.0,
  });

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }
  ).addTo(map);

  return map;
}
