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

//3
var requestCityInfoBtn = document.getElementById('requestCityInfoBtn');
var cityInput = document.getElementById('cityInput');

function capitalizeFirstChar(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

requestCityInfoBtn.addEventListener('click', function () {
    // Get the city name entered in the text box
    var cityName = cityInput.value;
    cityName = capitalizeFirstChar(cityName);
    
    // Check if the city name is not empty
    if (cityName.trim() !== '') {
        // Make a request to the OpenAQ API to get air quality data for the specified city
        fetch('https://api.openaq.org/v1/latest?city=' + encodeURIComponent(cityName))
            .then(response => response.json())
            .then(data => {
                // Check if the API response contains results
                if (data.results.length > 0) {
                    requestCityInfoBtn.disabled = true;
                    // Get the latitude, longitude, and pollution level from the API response
                    var lat = data.results[0].coordinates.latitude;
                    var lng = data.results[0].coordinates.longitude;
                    var pollutionLevel = data.results[0].measurements[0].value;
                    
                    // Call the function to add a marker at the specified coordinates with pollution level
                    var latLng = L.latLng(lat, lng);
                    addMarkerToMap(latLng);
                    var string = '<p>';
                    data.results[0].measurements.map(obj => {
                        string += obj.parameter.toUpperCase() + ': ' + obj.value + ' ' + obj.unit + '</br>'
                    });
                    string += '</p>'
                    var popup = L.popup()
                        .setLatLng(latLng)
                        .setContent(string)
                        .openOn(map);

                    // 3.iii
                    map.setView(latLng, 12);
                    requestCityInfoBtn.disabled = false;
                } else {
                    alert('No air quality data found for the specified city.');
                }
            })
            .catch(error => {
                console.error('Error fetching data from OpenAQ API:', error);
                alert('Error fetching data from OpenAQ API. Please try again.');
            });
    } else {
        alert('Please enter a city name.');
    }
});