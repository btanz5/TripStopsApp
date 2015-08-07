angular.module('mapApp.googleMapService', [])
	.factory('GoogleMapService', 
		['$http', function ($http){
		
		var googleMapService = {},
			map,
			currentLocation,
			markers = [],
			selectedMarkers = [],
			directionView,
			directions,
			infoWindow,
			service,
			traffic;

		//calculate route from current location to destination
		googleMapService.calcRoute = function(destinationValue, transportOption){
			var directionRoute = {
				origin : currentLocation,
				destination: destinationValue,
				travelMode: google.maps.TravelMode[transportOption]
		 	};

			directions.route(directionRoute, function (responce, status){
				if (status === google.maps.DirectionsStatus.OK){
					directionView.setDirections(responce);
				}
			});
		}

		googleMapService.addStops = function(stopValues){
			var request = {
				location: currentLocation,
				radius: '500',
				query: stopValues,
			};

			service.textSearch(request, findSearch);
		}

		function findSearch(results, status){
			if (status == google.maps.places.PlacesServiceStatus.OK){
				for (var i = 0; i < results.length; i++){
					createMarker(results[i]);
				}
			}
		}

		//create the markers of searched locatons
		function createMarker(place){
			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location,
				title: place.name
			});

			markers.push(marker);

			google.maps.event.addListener(marker, 'click', function (){
				infoWindow.setContent(place.formatted_address);
				infoWindow.open(map, this);
			});

			google.maps.event.addListener(marker, 'dblclick', function (){
				var latlng = marker.getPosition();
				var markerTitle = marker.getTitle();
				googleMapService.getSelectedMarker(latlng, markerTitle);
			});
		}

		//gets data of selected marker
		googleMapService.getSelectedMarker = function(latlng, markerTitle){
			//latitude = G longitude = K
			console.log("latitude: " + latlng.G)
			console.log("longitude: " + latlng.K)
			console.log("Title: " + markerTitle)

			$http.post('/api/locations', {
				markerName: markerTitle,
				latitude: latlng.G,
				longitude: latlng.K
			}).success(function (response){
				alert("You have added this marker to the database");
			});
		}

		//show traffic
		googleMapService.showTraffic = function(){
			traffic = new google.maps.TrafficLayer();
			traffic.setMap(map);
		}

		//clear map
		googleMapService.clearMap = function(){
				for (var i = 0; i < markers.length; i++){
					markers[i].setMap(null);
				}
				markers = [];	
				directionView.setDirections({routes: []});
				traffic.setMap(null);
		}

		//Initialize Google Map
		googleMapService.initialize = function(){
			var mapOptions = {
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			map = new google.maps.Map(document.getElementById('map'), mapOptions);

			if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function (location){
					currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude); 
				});
				map.setCenter(currentLocation);
			}

			directions = new google.maps.DirectionsService();
			directionView = new google.maps.DirectionsRenderer();
			infoWindow = new google.maps.InfoWindow();

			directionView.setMap(map);

			var currentLocMarker = new google.maps.Marker({
				position: currentLocation, 
				map: map
			});

			service = new google.maps.places.PlacesService(map);
	
		}

		navigator.geolocation.getCurrentPosition(googleMapService.initialize);

	return googleMapService;

	}])

