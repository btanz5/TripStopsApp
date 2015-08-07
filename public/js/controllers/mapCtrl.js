var mapCtrl = angular.module('mapApp.controllers.mapCtrl', []);

mapCtrl.controller('MapController', 
	['$scope', '$location', 'AuthenticationService', 'GoogleMapService',
	function ($scope, $location, AuthenticationService, GoogleMapService) {

		GoogleMapService.initialize();

		//logout
		$scope.logout = function(){
			AuthenticationService.ClearCredentials();
			$location.path('login');
		}

		$scope.calcRoute = function(){
			GoogleMapService.calcRoute($scope.destinationVal, $scope.transport);
		}

		$scope.addStops = function(){
			GoogleMapService.addStops($scope.stopVal);
		}

		$scope.clearMap = function(){
			GoogleMapService.clearMap();
		}

		$scope.showTraffic = function(){
			GoogleMapService.showTraffic();
		}
	
}]);

