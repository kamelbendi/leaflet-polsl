// 1 && 2.1
var map = L.map('map').setView([50.2886709, 18.6776717], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 2.b
addMarkerToMap([50.288635680225504, 18.67739751153425]); // AEI

// 2.c
function addMarkerToMap(latlng) {
    // Create a marker and add it to the map
    var newMarker = L.marker(latlng).addTo(map);

    // Add a click event to the new marker
    newMarker.on('click', function () {
        // Remove the clicked marker from the map
        map.removeLayer(newMarker);
    });
}

// 2.d
map.on('click', function (e) {
    // Get the coordinates where the map was clicked
    var clickedLatLng = e.latlng;

    // Call the function to add a marker at the clicked coordinates
    addMarkerToMap(clickedLatLng);
});

// 2.e
var circle = L.circle([50.288635680225504, 18.67739751153425], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 60
}).addTo(map);

var polygon = L.polygon([
    [50.28845935140892, 18.679295236721156],
    [50.28878830840202, 18.679418388533296],
    [50.28918836253888, 18.678713603986086],
    [50.28883191636224, 18.67833227845212]
]).addTo(map);
