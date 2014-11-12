'use strict';

/* jasmine specs for controllers go here */
describe('app controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('app'));
  beforeEach(module('appServices'));

  describe('personsCtrl', function(){
    var scope, ctrl, $httpBackend,
        testPersons = [{id: 1, name: 'Test 1'}, {id: 2, name: 'Test 2'}];


    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('json/persons.json').
          respond(testPersons);

      scope = $rootScope.$new();
      ctrl = $controller('personsCtrl', {$scope: scope});
    }));


    it('should fetch persons', function() {
      expect(scope.persons).toEqualData([]);
      $httpBackend.flush();

      expect(scope.persons).toEqualData(testPersons);
    });
  });


  describe('personCtrl', function(){
    var scope, $httpBackend, ctrl,
        testPerson = {id: 1, name: "Test 1"};


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('json/1.json').respond(testPerson);

      $routeParams.personId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('personCtrl', {$scope: scope});
    }));


    it('should fetch person', function() {
      expect(scope.person).toEqualData({});
      $httpBackend.flush();

      expect(scope.person).toEqualData(testPerson);
    });
  });
});
