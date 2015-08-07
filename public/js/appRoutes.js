 /*
	ANGULAR ROUTES
 					*/

 var routing = angular.module('mapApp.appRoutes', []);

routing.config(['$routeProvider',  
	function($routeProvider) {

	$routeProvider.

	when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	}).

	when('/signup', {
		templateUrl: 'views/signup.html',
		controller: 'SignUpController'
	}).

	when('/map', {
		templateUrl: 'views/map.html',
		controller: 'MapController'
	}).

	otherwise({
		redirectTo: '/login'
	});
	
}]);