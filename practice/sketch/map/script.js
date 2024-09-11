function initialize() {
  var myCenter = new google.maps.LatLng(37.5503, 126.9971);

  var mapProp = {
    center: myCenter,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  map = new google.maps.Map(document.getElementById("gMap"), mapProp);

  google.maps.event.addListener(map, "click", function (event) {
    placeMarker(event.latLng);
    saveMarker(event);
  });

  map.data.setControls(['Point']);
  bindDataLayerListeners(map.data);

  //load saved data
  loadMarkers(map);
}

function placeMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  var infowindow = new google.maps.InfoWindow({
    content: "Latitude: " + location.lat() + "<br>Longitude: " + location.lng(),
  });
  infowindow.open(map, marker);

  map.data.add(
    new google.maps.Data.Feature({
      properties: {},
      geometry: new google.maps.Data.Point(location),
    })
  );
}

// Apply listeners to refresh the GeoJson display on a given data layer.
function bindDataLayerListeners(dataLayer) {
  dataLayer.addListener("addfeature", saveMarker);
  dataLayer.addListener("removefeature", saveMarker);
  dataLayer.addListener('setgeometry', saveMarker);
}

function saveMarker() {
  map.data.toGeoJson(function (json) {
    localStorage.setItem("geoData", JSON.stringify(json));
  });
}

function clearMarkers() {
  map.data.forEach(function (f) {
    map.data.remove(f);
  });
}

function loadMarkers(map) {
  var data = JSON.parse(localStorage.getItem("geoData"));
  map.data.addGeoJson(data);
}

//google.maps.event.addDomListener(window, 'load', initialize);
initialize();

