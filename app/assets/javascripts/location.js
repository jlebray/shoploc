function userLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        
        $("#lat").text(position.coords.latitude);
        $("#lng").text(position.coords.longitude);
        

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
    alert("Geolocalisation failed");
  }
}

