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
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }
  ).addTo(map);

  return map;
}
