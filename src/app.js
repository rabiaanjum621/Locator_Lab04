var map;
var markers = [];
var markersInfo = [];
let accessToken =
  "pk.eyJ1IjoicmFiaWE2MjEiLCJhIjoiY2wxa2NyNXFvMHplajNlcGJpN2RndDE1YyJ9.JPZwuNdbIXFa8Ct94EmZ7w";
document.addEventListener("init", (e) => {
  if (e.target.id === "home") {
    map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        accessToken,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken,
      }
    ).addTo(map);
    map.on("click", onMapClick);
  }
  var saveBtn = document.querySelector("#saveAll")
  saveBtn.addEventListener('click', (e) =>{
    console.log("save button clicked")
    saveMarkersState();
  })
  reLoadMarkers();
});


const saveMarkersState = async () => {
try {
    await localforage.setItem("state", markersInfo);
  } catch (e) {
    return console.log("error", e);
  }
  console.log("successfully saved");
};

const reLoadMarkers = async () => {
  try {
    const newState = await localforage.getItem("state");
    if (newState && Object.keys(newState).length !== 0) {
      markersInfo = [...newState];
    }
    markersInfo.forEach((e) => {
      var marker = L.marker([e.lat, e.lng]).addTo(map);
      marker
      .bindPopup(
        e.message +
          ` <br><br><button onClick="clearMarker('${e.lat}', '${e.lng}')" >clear</button>`
      )
      .openPopup();
    L.popup().setLatLng([e.lat, e.lng]).setContent(e.message);
      markers.push(marker);
    });
  } catch (e) {
    console.log("error loading state", e);
  }
};

const onMapClick = function (e) {
  console.log("onMapClick");
  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  ons.notification.prompt("Prompt!").then(function (input) {
    var message = input ? input : "I am a popup!";
    marker
      .bindPopup(
        message +
          ` <br><br><button onClick="clearMarker('${e.latlng.lat}', '${e.latlng.lng}')" >clear</button>`
      )
      .openPopup();
    L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).setContent(message);
    markers.push(marker);

    var markerData = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      message: message
    };

    markersInfo.push(markerData);
  });
};

function removeAllMarkers() {
  markers.forEach((e) => {
    map.removeLayer(e);
    markers = [];
    markersInfo = [];
    saveMarkersState();
  });
}

function clearMarker(lat, lng) {
  let matchedMarker = markers.find(
    (element) => element._latlng.lat == lat && element._latlng.lng == lng
  );
  if (matchedMarker) {
    map.removeLayer(matchedMarker);
    let index = markers.indexOf(matchedMarker);
    if (index > -1) {
      markers.splice(index, 1);
    }
  }
  let markerObj = markersInfo.find(
    (element) => element.lat == lat && element.lng == lng
  );
  if (markerObj) {
    let index = markersInfo.indexOf(markerObj);
    if (index > -1) {
      markersInfo.splice(index, 1);
    }
  }
  saveMarkersState();
}

function userCurrentLocation() {
  map.locate({ setView: true, maxZoom: 16 });
}
