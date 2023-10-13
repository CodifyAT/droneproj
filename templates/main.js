// Initialize the map using Leaflet
var map = L.map('map').setView([51.505, -0.09], 13); // Set your initial coordinates and zoom level
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Use a map tile provider

// Function to start the drone mission
function startMission() {
    // Implement your mission start logic here
    console.log('Drone mission started.');
}

// Function to stop the drone mission
function stopMission() {
    // Implement your mission stop logic here
    console.log('Drone mission stopped.');
}

// Attach click events to buttons
document.getElementById('startMission').addEventListener('click', startMission);
document.getElementById('stopMission').addEventListener('click', stopMission);
// Initialize the map using Leaflet
var map = L.map('map').setView([51.505, -0.09], 13); // Set your initial coordinates and zoom level
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Use a map tile provider

// Function to display the coordinates on click
function onMapClick(e) {
    // e.latlng contains the clicked coordinates
    var coordinates = e.latlng;
    var coordinatesText = "Coordinates: " + coordinates.lat.toFixed(6) + ", " + coordinates.lng.toFixed(6);

    // Display the coordinates below the map
    document.getElementById('coordinates').textContent = coordinatesText;
}

// Attach the click event to the map
map.on('click', onMapClick);
