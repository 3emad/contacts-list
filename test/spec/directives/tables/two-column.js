'use strict';

describe('Directive: tables/twoColumn', function () {

  // load the directive's module
  beforeEach(module('contantsListApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tables/two-column></tables/two-column>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tables/twoColumn directive');
  }));
});
