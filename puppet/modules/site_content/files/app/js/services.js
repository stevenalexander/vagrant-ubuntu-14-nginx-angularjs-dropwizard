'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Person', ['$resource',
  function($resource){
    return $resource('json/:personId.json', {}, {
      query: {method:'GET', params:{personId:'persons'}, isArray:true}
    });
  }]);
