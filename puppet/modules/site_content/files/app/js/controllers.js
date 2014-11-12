'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('personsCtrl', ['$scope', 'Person',
  function($scope, Person) {
    $scope.persons = Person.query();
  }]);

appControllers.controller('personCtrl', ['$scope', '$routeParams', 'Person',
  function($scope, $routeParams,  Person) {
    $scope.person = Person.get({ personId: $routeParams.personId });
  }]);