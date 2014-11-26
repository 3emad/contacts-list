'use strict';

describe('Service: ContactGet', function() {

    // load the service's module
    beforeEach(module('ContantslistApp'));

    // instantiate service
    var ContactGet;
    beforeEach(inject(function(_ContactGet_) {
        ContactGet = _ContactGet_;
    }));

    it('should do something', function() {
        expect(!!ContactGet).toBe(true);
    });

});

describe('Global Service: ', function() {
    var Global, $httpBackend

    // load the relevant application module, with the service to be tested
    beforeEach(module('bkJoga'));

    beforeEach(function() {

        // inject the mock for the http backend
        inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        });
        // mock the response to a particular get request
        $httpBackend.whenGET('/jogasok').respond([{
            id: 1,
            name: 'asdfasdf'
        }, {
            id: 2,
            name: '2wrerwert'
        }]);
        // inject the service to be tested
        inject(function(_Global_) {
            Global = _Global_;
        });
    });

    it('should exist', function() {
        expect(!!Global).toBe(true);
    });

    it('getJogasok should return everyone', function() {
        $httpBackend.flush(); // <------------ need to flush $httpBackend
        expect(JSON.stringify(Global.getJogasok())).toBe(JSON.stringify([{
            id: 1,
            name: 'asdfasdf'
        }, {
            id: 2,
            name: '2wrerwert'
        }]));
    });
});
