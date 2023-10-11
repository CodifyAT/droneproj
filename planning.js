var map;
        var markers = [];
        var lines = [];

        function initMap() {
            // Coordinates for the initial center of the map (San Francisco, CA)
            var centerCoordinates = { lat: 17.397228, lng: 78.490215};

            // Create the map
            map = new google.maps.Map(document.getElementById('map'), {
                center: centerCoordinates,
                zoom: 10,
                mapTypeId:google.maps.MapTypeId.SATELLITE
            });

            // Add click event listener to the map
            map.addListener('click', function(event) {
                var marker = placeMarker(event.latLng);
                markers.push(marker);
                updateLines();
            });
        }

        function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });

            // Create an info window for each marker
            var infoWindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
            });

            marker.addListener('click', function () {
                // Open the info window when the marker is clicked
                infoWindow.open(map, marker);
            });
           

            return marker;
        }
        

        function updateLines() {
            if (markers.length >= 2) {
                var lineCoordinates = markers.map(function(marker) {
                    return marker.getPosition();
                });

                // Create a polyline
                var polyline = new google.maps.Polyline({
                    path: lineCoordinates,
                    geodesic: true,
                    strokeColor: '#0000FF', // Line color
                    strokeOpacity: 1.0,
                    strokeWeight: 3 // Line thickness
                });

                // Display coordinates when clicking on the polyline
                var infoWindow = new google.maps.InfoWindow({
                    content: 'Polyline Coordinates: <br>' + lineCoordinates.map(function(coord) {
                        return 'Latitude: ' + coord.lat() + ', Longitude: ' + coord.lng();
                    }).join('<br>')
                });

                polyline.setMap(map);
                lines.push(polyline);

                polyline.addListener('click', function () {
                    infoWindow.setPosition(event.latLng);
                    infoWindow.open(map);
                });
               
            }
        }
  

 
        // Load the map when the page loads
        window.onload = function () {
            initMap();
        };