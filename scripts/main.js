import { getGBFS, getStationObject } from "./gbfs.js";
import {
  fillDropDown,
  timeSinceUpdate,
  setClickedStyle,
  setDefaultStyle,
  toggleDialog,
} from "./utils.js";
import { feedURLStem, defaultStyle } from "./globals.js";
import { map } from "./map.js";

const mapObj = map();
const stationSelect = document.querySelector("#station-select");
const stationNames = [];
const stationsFeatureGroup = L.featureGroup();
const infoBoxOpen = document.querySelector("#info-box-open");
const infoBoxClose = document.querySelector("#info-box-close");
const infoBox = document.querySelector("#info-box");

// manage info box visibility
infoBoxOpen.addEventListener("click", () => {
  toggleDialog(infoBox);
});

infoBoxClose.addEventListener("click", () => {
  toggleDialog(infoBox);
});

// once document is parsed, get station names and locations
document.addEventListener("DOMContentLoaded", async () => {
  const r = await getGBFS(feedURLStem + "station_information.json");
  const stations = r.data.stations;

  // create a point for each station
  for (const station in stations) {
    const stn = stations[station];

    // add current station to station names array
    stationNames.push(stn.name);

    // create and style point for current station
    const stnPoint = L.circleMarker([stn.lat, stn.lon], defaultStyle);

    // add name of stationa as a property, then add to the feature group
    stnPoint.stationName = stn.name;
    stnPoint.bindTooltip(`<strong>${stnPoint.stationName}</strong>`);
    stnPoint.addTo(stationsFeatureGroup);
  }

  stationsFeatureGroup.on("click", stationPointInfo);
  stationsFeatureGroup.on("mouseover", setClickedStyle);
  stationsFeatureGroup.on("mouseout", setDefaultStyle);

  // add stations group to map
  stationsFeatureGroup.addTo(mapObj);

  fillDropDown(stationNames.sort(), stationSelect);
});

// get station info for popup on drop down selection
stationSelect.addEventListener("change", async () => {
  const stnInfo = await getStationObject(stationSelect.value);

  stationsFeatureGroup.eachLayer((layer) => {
    if (layer.stationName === stnInfo.name) {
      // zoom to point
      mapObj.flyTo(layer.getLatLng(), 14, { duration: 0.8 });

      layer
        .bindPopup(
          `
          <h3>${stnInfo.name}</h3>
          <pre>eBikes: ${stnInfo.num_ebikes_available} | Classic: ${
            stnInfo.num_bikes_available - stnInfo.num_ebikes_available
          } | Docks: ${stnInfo.num_docks_available}</pre>
          <p id="update-time">${timeSinceUpdate(stnInfo.last_reported)}</p>
          `
        )
        .openPopup();
    }
  });
});

// get station info for popup on marker click
async function stationPointInfo(e) {
  const stnInfo = await getStationObject(e.layer.stationName);
  stationSelect.value = stnInfo.name;

  e.layer
    .bindPopup(
      `
    <h3>${stnInfo.name}</h3>
    <pre>eBikes: ${stnInfo.num_ebikes_available} | Classic: ${
        stnInfo.num_bikes_available - stnInfo.num_ebikes_available
      } | Docks: ${stnInfo.num_docks_available}</pre>
    <p id="update-time">${timeSinceUpdate(stnInfo.last_reported)}</p>
    `
    )
    .openPopup()
    .bringToFront();
}
