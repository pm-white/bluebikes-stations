import { clickedStyle, defaultStyle } from "./globals.js";

// fills out drop down of station name
// stations is an array of station objects from station_information.json
// node is the parent element to add the option to
export function fillDropDown(stations, node) {
  for (const station of stations) {
    const newOption = document.createElement("option");
    newOption.value = station;
    newOption.text = station;
    node.appendChild(newOption);
  }
}

// creates message for time since last update based on last_update timestamp in station_status.json
export function timeSinceUpdate(timestamp) {
  const updateTimeStamp = new Date(timestamp * 1000);
  let updateMsg = "";

  const minSinceUpdate = new Date(Date.now() - timestamp * 1000).getMinutes();
  const secSinceUpdate = new Date(Date.now() - timestamp * 1000).getSeconds();

  if (minSinceUpdate < 1) {
    updateMsg = `Last updated ${secSinceUpdate} seconds ago.`;
  } else if (minSinceUpdate === 1) {
    updateMsg = `Last updated ${minSinceUpdate} minute ago.`;
  } else if (minSinceUpdate >= 1 && minSinceUpdate <= 10) {
    updateMsg = `Last updated ${minSinceUpdate} minutes ago.`;
  } else {
    updateMsg = `Last updated ${updateTimeStamp.toLocaleTimeString()} on ${updateTimeStamp.toLocaleDateString()}.`;
  }

  return updateMsg;
}

// change point symbology
export function setClickedStyle(e) {
  e.layer.setStyle(clickedStyle);
}

// change point symbology
export function setDefaultStyle(e) {
  e.layer.setStyle(defaultStyle);
}

// opens or closes the info dialog box
export function toggleDialog(dialog) {
  if (dialog.open) {
    dialog.close();
  } else {
    dialog.showModal();
  }
}
