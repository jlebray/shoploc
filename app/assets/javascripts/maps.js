
function initMap(view, shops, origin) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  if (view.equals('index')) {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            $("#latitude-loc").text(pos.lat);
            $("#longitude-loc").text(pos.lng);
            $("#latitude-loc_field").val(pos.lat);
            $("#longitude-loc_field").val(pos.lng);
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
  }
      else if (view.equals('list')) {
        var originMarker = new google.maps.Marker({
          position: origin,
          map: map,
        });
      }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
