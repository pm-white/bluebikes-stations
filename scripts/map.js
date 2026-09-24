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
    'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
  }).addTo(map);

  return map;
}
