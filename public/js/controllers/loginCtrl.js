var loginCtrl = angular.module('mapApp.controllers.loginCtrl', []);

loginCtrl.controller('LoginController', 
	['$scope', '$rootScope', '$location', 'AuthenticationService',
	 function ($scope, $rootScope, $location, AuthenticationService) {

	 	//reset the login status
	 	AuthenticationService.ClearCredentials();

	 	$scope.login = function(){
	 		$scope.dataLoading = true;
	 		AuthenticationService.Login($scope.username, $scope.password, function (response){
	 			if (response.success){
	 				AuthenticationService.SetCredentials($scope.username, $scope.password);
	 				//if successful relocate to map page.
	 				$location.path('map');
	 			} else {
	 				$scope.error = response.message;
	 				$scope.dataLoading = false;
	 				alert("Invaild login credentials, please try again.");
	 			}
	 		});
	 	};
}]);