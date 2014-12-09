'use strict';

describe('app', function() {

  it('should redirect index.html to index.html#/persons', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/persons');
      });
  });


  describe('persons view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/persons');
    });


    it('should display persons', function() {
      var personList = element.all(by.repeater('person in persons'));

      expect(personList.count()).toBe(2);
    });

    it('should render person specific links', function() {
      element.all(by.css('table td a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/persons/1');
      });
    });
  });


  describe('person view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/person/1');
    });


    it('should display person', function() {
      expect(element(by.binding('person.name')).getText()).toBe('person1');
    });
  });
});
