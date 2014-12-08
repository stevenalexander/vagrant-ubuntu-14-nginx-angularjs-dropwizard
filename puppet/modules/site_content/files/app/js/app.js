'use strict';

/* App Module */

var app = angular.module('app', [
  'ngRoute',
  'appConfig',
  'appControllers',
  'appServices'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/persons', {
        templateUrl: 'partials/persons.html',
        controller: 'personsCtrl'
      }).
      when('/persons/:personId', {
        templateUrl: 'partials/person.html',
        controller: 'personCtrl'
      }).
      otherwise({
        redirectTo: '/persons'
      });
  }]);