'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource', 'appConfig']);

appServices.factory('Person', ['$resource',
  function($resource){
    return $resource(appConfig.serviceUrl + '/:personId', {}, {
      query: {method:'GET', params:{personId:''}, isArray:true}
    });
  }]);
