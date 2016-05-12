
function mapIndex(shops) {var map = new GMaps({
  div: '#map-index',
         lat: 48,
         lng: 2
});
var userLat = 0, userLng = 0, userMarker;

var radiusCircle = map.drawCircle({
  // lat: userLat,
  //   lng: userLng,
  lat: 48,
    lng: 2,
    radius: 10000,
    fillOpacity: 0.2,
    fillColor: '#FF1212',
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    draggable: true,
    editable:true
});


$("#geoloc").click( function() {

  GMaps.geolocate({
    success: function(position) {
      userLat = position.coords.latitude;
      userLng = position.coords.longitude;
      map.setCenter(userLat, userLng);
      $("#latitude").val(userLat);
      $("#longitude").val(userLng);
      userMarker = map.addMarker({
        lat: userLat,
                 lng: userLng,
                 title: 'Your position',
                 infoWindow: {
                   content: 'Your position'
                 }
      });
      radiusCircle.setCenter({
        lat: userLat,
        lng: userLng});
      map.fitBounds(radiusCircle.getBounds());

    },
      error: function(error) {
        alert('Geolocation failed: '+error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      },
  });

});

$("#geoloc").click();




$("#radius").change( function() {
  radiusCircle.setRadius(1000 * parseFloat($("#radius").val()));
  map.fitBounds(radiusCircle.getBounds());
});

google.maps.event.addListener(radiusCircle, 'center_changed', function()   
    {
      $("#latitude").val(radiusCircle.getCenter().lat);
      $("#longitude").val(radiusCircle.getCenter().lng);
    });  
google.maps.event.addListener(radiusCircle, 'radius_changed', function()   
    {  
      $("#radius").val(Math.round(radiusCircle.getRadius()) / 1000);
      map.fitBounds(radiusCircle.getBounds());
    });  
google.maps.event.addListener(radiusCircle, 'dragend', function()   
    {  
      map.fitBounds(radiusCircle.getBounds());
    });  
}

function addshops(map,shops,shops_latlng) {
var shopIcon = '/assets/small-shop-icon.png';
for(var i = 0; i < shops.length; i++) {
  shops_latlng.push(new google.maps.LatLng({lat: parseFloat(shops[i].latitude), lng: parseFloat(shops[i].longitude)}));
  map.addMarker({
    lat: shops[i].latitude,
    lng: shops[i].longitude,
    title: shops[i].name,
    icon: shopIcon,
    infoWindow: {
      content: '<p><strong>'+shops[i].name + '</strong></p>' +
    '<p>' + shops[i].address + '<br>' + shops[i].zip + ' ' + shops[i].city + '</p>' +
    '<p>' + shops[i].latitude + ', ' + shops[i].longitude + '</p>'
              
    }
  });
}
map.fitLatLngBounds(shops_latlng);
}
