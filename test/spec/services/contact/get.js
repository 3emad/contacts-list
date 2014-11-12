'use strict';

describe('Service: ContactGet', function () {

  // load the service's module
  beforeEach(module('ContantslistApp'));

  // instantiate service
  var ContactGet;
  beforeEach(inject(function (_ContactGet_) {
    ContactGet = _ContactGet_;
  }));

  it('should do something', function () {
    expect(!!ContactGet).toBe(true);
  });

});
