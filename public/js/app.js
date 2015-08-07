var mapApp = angular.module('mapApp', [
    'ngRoute',
    'ngCookies',
    'mapApp.appRoutes',
    'mapApp.controllers.loginCtrl',
    'mapApp.controllers.mapCtrl',
    'mapApp.controllers.signupCtrl',
    'mapApp.googleMapService',
    'mapApp.authService'
])