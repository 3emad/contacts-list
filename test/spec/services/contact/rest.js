'use strict';

describe('Service: ContactRest', function () {

  // load the service's module
  beforeEach(module('ContantslistApp'));

  // instantiate service
  var ContactRest;
  beforeEach(inject(function (_ContactRest_) {
    ContactRest = _ContactRest_;
  }));

  it('should do something', function () {
    expect(!!ContactRest).toBe(true);
  });

});
