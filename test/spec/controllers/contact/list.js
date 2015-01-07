'use strict';

describe('Controller: ContactListCtrl', function() {

    // load the controller's module
    beforeEach(module('contantsListApp'));
    beforeEach(module('my.templates'));

    var ContactListCtrl;
    var scope;
    var state;
    var httpBackend;
    var API_URL;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures'; // jshint ignore:line
    // load mock up data
    var contactsList = getJSONFixture('contacts.json'); // jshint ignore:line

    // Initialize the controller and a mock scope
    beforeEach(inject(function($injector) {

        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        var $state = $injector.get('$state');
        var $httpBackend = $injector.get('$httpBackend');
        var CONFIG =  $injector.get('CONFIG');
        CONFIG.activeModel = activeModel; // jshint ignore:line

        scope = $rootScope.$new();
        state = $state;
        httpBackend = $httpBackend;
        API_URL = CONFIG.API.host + 'contacts';

        // fake call it
        $httpBackend.when('GET', API_URL).respond(contactsList[0]);
        // load the router
        state.transitionTo('main');
        scope.$apply();

        ContactListCtrl = $controller('ContactListCtrl', {
          $scope: scope,
        });
    }));

    describe(' - Contacts/List - ', function() {
        it('0 entry', function() {
            expect(scope.contactsList.length).toBe(0);
        });

        it('loading?', function() {
            expect(scope.loading).toBe(true);
        });

        it('500 entry of contact list', function() {
            httpBackend.flush();
            expect(scope.contactsList.length).toBe(500);
        });

        it('done loading?', function() {
            httpBackend.flush();
            expect(scope.loading).toBe(false);
        });
    });

});
