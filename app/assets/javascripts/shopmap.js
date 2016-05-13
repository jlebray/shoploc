
var shopIcon = '/assets/small-shop-icon.png';

function mapIndex(shops, origin, radius) {

  var map = new GMaps({
    div: '#map',
      lat: (origin || {lat: 48}).lat,
      lng: (origin || {lng: 2}).lng
  });
$("#map").resizable();
  var userLat = 0, userLng = 0;
  var userMarker = map.addMarker({
    lat: 0,
      lng: 0,
      title: 'Origin',
      infoWindow: {
        content: 'Origin'
      }
    });

  var radiusCircle = map.drawCircle({
      lat: (origin || {lat: 48}).lat,
      lng: (origin || {lng: 2}).lng,
      radius: radius || 10000,
      fillOpacity: 0.2,
      fillColor: '#FF1212',
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      draggable: true,
      editable:true
  });
  var circleMarker = map.addMarker({
      lat: (origin || {lat: 48}).lat,
      lng: (origin || {lng: 2}).lng,
      infoWindow: {
        content: '<p>Search location</p>'
      }
  })


  $("#geoloc").click( function() {

    GMaps.geolocate({
      success: function(position) {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        map.setCenter(userLat, userLng);
        $("#latitude").val(userLat);
        $("#longitude").val(userLng);
        userMarker.setPosition({
          lat: userLat,
                   lng: userLng,
        });
    userMarker.infoWindow.setContent(
        '<p>Your position</p><p>' + userLat + ', ' + userLng + '</p>'
        );
        radiusCircle.setCenter({
          lat: userLat,
          lng: userLng});
        circleMarker.setPosition({
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
  if (typeof origin == 'undefined') { 
    $("#geoloc").click();
  } else {
    $("#latitude").val(origin.lat);
    $("#longitude").val(origin.lng);
    userMarker.setPosition({
      lat: origin.lat,
      lng: origin.lng,
    });
    userMarker.infoWindow.setContent(
        '<p>Origin</p><p>' + origin.lat + ', ' + origin.lng + '</p>'
        );
    for(var i = 0; i < shops.length; i++) {
      shopMarker(map, shops[i]);
      map.fitBounds(radiusCircle.getBounds());
    }

  }




  $("#radius").change( function() {
    radiusCircle.setRadius(1000 * parseFloat($("#radius").val()));
    map.fitBounds(radiusCircle.getBounds());
  });

  google.maps.event.addListener(radiusCircle, 'center_changed', function()   
      {
        $("#latitude").val(radiusCircle.getCenter().lat());
        $("#longitude").val(radiusCircle.getCenter().lng());
        debugger;
        circleMarker.setPosition({
          lat: radiusCircle.getCenter().lat(),
          lng: radiusCircle.getCenter().lng()});
        debugger;
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
  for(var i = 0; i < shops.length; i++) {
    shops_latlng.push(new google.maps.LatLng({lat: parseFloat(shops[i].latitude), lng: parseFloat(shops[i].longitude)}));
    shopMarker(map, shops[i]);
  }
  map.fitLatLngBounds(shops_latlng);
}

function shopMarker(map, shop) {
  map.addMarker({
    lat: shop.latitude,
  lng: shop.longitude,
  title: shop.name,
  icon: shopIcon,
  infoWindow: {
    content: '<p><strong>'+shop.name + '</strong></p>' +
    '<p>' + shop.address + '<br>' + shop.zip + ' ' + shop.city + '</p>' +
    '<p>' + shop.latitude + ', ' + shop.longitude + '</p>'
  }
  });
}

function mapList() {
  var map = new GMaps({
    div: '#map',
      lat: origin.lat,
      lng: origin.lng
  });

  var userMarker = map.addMarker({
    lat: origin.lat,
      lng: origin.lng,
      title: 'Your position',
      infoWindow: {
        content: 'Your position'
      }
  });

  var shops_latlng = []; 
  shops_latlng.push(new google.maps.LatLng({lat: origin.lat, lng: origin.lng}));

  addshops(map,shops,shops_latlng);

  var radiusCircle = map.drawCircle({
    lat: origin.lat,
      lng: origin.lng,
      radius: radius*1000,
      fillOpacity: 0.2,
      fillColor: '#FF1212',
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
  });
}
