// var map;
//         var markers = [];
//         var lines = [];

//         function initMap() {
//             // Coordinates for the initial center of the map (San Francisco, CA)
//             var centerCoordinates = { lat: 17.397228, lng: 78.490215};

//             // Create the map
//             map = new google.maps.Map(document.getElementById('map'), {
//                 center: centerCoordinates,
//                 zoom: 10,
//                 mapTypeId:google.maps.MapTypeId.SATELLITE
//             });

//             // Add click event listener to the map
//             map.addListener('click', function(event) {
//                 var marker = placeMarker(event.latLng);
//                 markers.push(marker);
//                 updateLines();
//             });
//         }

//         function placeMarker(location) {
//             var marker = new google.maps.Marker({
//                 position: location,
//                 map: map
//             });

//             // Create an info window for each marker
//             var infoWindow = new google.maps.InfoWindow({
//                 content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
//             });

//             marker.addListener('click', function () {
//                 // Open the info window when the marker is clicked
//                 infoWindow.open(map, marker);
//             });
           

//             return marker;
//         }
        

//         function updateLines() {
//             if (markers.length >= 2) {
//                 var lineCoordinates = markers.map(function(marker) {
//                     return marker.getPosition();
//                 });

//                 // Create a polyline
//                 var polyline = new google.maps.Polyline({
//                     path: lineCoordinates,
//                     geodesic: true,
//                     strokeColor: '#0000FF', // Line color
//                     strokeOpacity: 1.0,
//                     strokeWeight: 3 // Line thickness
//                 });

//                 // Display coordinates when clicking on the polyline
//                 var infoWindow = new google.maps.InfoWindow({
//                     content: 'Polyline Coordinates: <br>' + lineCoordinates.map(function(coord) {
//                         return 'Latitude: ' + coord.lat() + ', Longitude: ' + coord.lng();
//                     }).join('<br>')
//                 });

//                 polyline.setMap(map);
//                 lines.push(polyline);

//                 polyline.addListener('click', function () {
//                     infoWindow.setPosition(event.latLng);
//                     infoWindow.open(map);
//                 });
               
//             }
//         }
  

 
//         // Load the map when the page loads
//         window.onload = function () {
//             initMap();
//         };
var map;
        var markers = [];
        var lines = [];
        var i = 1;
        function initMap() {
            var initialLocation = { lat: 0, lng: 0 }; // Initial map location

            map = new google.maps.Map(document.getElementById('map'), {
                center: initialLocation,
                zoom: 8 ,// You can adjust the initial zoom level here
                mapTypeId:google.maps.MapTypeId.SATELLITE 
            });

            // Add a click event listener to the map to add a marker at the clicked location
            map.addListener('click', function(event) {
                addMarker(event.latLng);
            });

            // Initialize the coordinates
            updateCoordinates(initialLocation);
        }

        function addMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable: true
            });
            updateCoordinates(marker.getPosition());
            // Add an event listener to the marker to update the coordinates

            markers.push(marker);

            // Create and update lines between markers
            updateLines();
        }

        function updateCoordinates(position) {
            var coordinatesDiv = document.getElementById('coordinates');
            var coordinatesText = coordinatesDiv.textContent;
            var row = coordinatesDiv.insertRow(0);
            var sno = row.insertCell(0)
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            cell1.innerHTML = position.lat();
            cell2.innerHTML = position.lng();
            sno.innerHTML = i;
            i++;
        }

        function updateLines() {
            // Clear existing lines
            lines.forEach(function(line) {
                line.setMap(null);
            });
            lines = [];

            // Create lines between markers
            for (var i = 1; i < markers.length; i++) {
                var line = new google.maps.Polyline({
                    path: [markers[i - 1].getPosition(), markers[i].getPosition()],
                    map: map,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                lines.push(line);
            }
        }