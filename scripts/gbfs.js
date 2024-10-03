import { feedURLStem } from "./globals.js";

// gets ojbects from several of the Blue Bike GBFS feed endpoints
// url is a url for one of the GBFS feed endpoints
export async function getGBFS(url) {
  const request = new Request(url);
  const response = await fetch(request);
  const feed = await response.json();
  return feed;
}

let stationId = "";
let stationInfo = {};
let stationStatus = {};

// gets the status for the selected station
// station is the name of a station
export async function getStationObject(station) {
  // filter station_information to the station
  await getGBFS(feedURLStem + "station_information.json").then((response) => {
    stationInfo = response.data.stations.filter(
      (stationInfo) => stationInfo.name === station
    )[0];

    stationId = stationInfo.station_id;
  });

  // filter station_status to the station
  await getGBFS(feedURLStem + "station_status.json").then((response) => {
    stationStatus = response.data.stations.filter(
      (stationStatus) => stationStatus.station_id === stationId
    )[0];
  });

  return { ...stationInfo, ...stationStatus };
}
