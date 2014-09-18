angular.module('e2eApp', ['ngSVGAttributes']).
  config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
