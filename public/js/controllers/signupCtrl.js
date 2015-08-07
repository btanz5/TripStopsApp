var signupCtrl = angular.module('mapApp.controllers.signupCtrl', []);

signupCtrl.controller('SignUpController',
	['$scope', '$rootScope', '$location', 'AuthenticationService',
	 function ($scope, $rootScope, $location, AuthenticationService) {

	 	AuthenticationService.ClearCredentials();

	 	$scope.signUp = function (){
	 		$scope.dataLoading = true;

	 		AuthenticationService.SignUp($scope.username, $scope.password, function (response){
	 			if (response.success){
	 				AuthenticationService.SetCredentials($scope.username, $scope.password);
	 				$location.path('map');
	 			} else {
	 				$scope.error = response.message;
	 				$scope.dataLoading = false;
	 				alert("Sorry but we couldn't register you, please try again");
	 			}
	 		});
	 	};
}]);