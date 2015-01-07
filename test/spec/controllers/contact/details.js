'use strict';

describe('Controller: ContactDetailsCtrl', function() {

    // load the controller's module
    beforeEach(module('contantsListApp'));
    beforeEach(module('my.templates'));

    var ContactDetailsCtrl;
    var scope;
    var state;
    var httpBackend;
    var API_URL;
    var ID = 0;
    var dataId;
    var getUriHandler;

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
        dataId = contactsList[0].contacts[ID];

        // fake call it
        getUriHandler = httpBackend.when('GET', API_URL).respond(contactsList[0].contacts[ID]);

        state.transitionTo('main.details', {id: 0});
        scope.$apply();
        ContactDetailsCtrl = $controller('ContactDetailsCtrl', {
          $scope: scope,
        });
    }));

    afterEach (function() {
        httpBackend.verifyNoOutstandingExpectation ();
        httpBackend.verifyNoOutstandingRequest ();
    });

    describe(' - Contacts/Details - ', function() {

        it('Empty Details', function() {
            expect(_.size(scope.contact)).toBe(0);
            httpBackend.flush(); // flash it for empty list after checking
        });

        describe(' Getters - ', function() {
            it('Get ALL VALID', function() {
                getUriHandler.respond(contactsList[0].contacts[ID]);
                ContactDetailsCtrl.get();
                httpBackend.flush();
                expect(JSON.stringify(scope.contact)).toEqual(JSON.stringify(contactsList[0].contacts[ID]));
            });

            it('Get one VALID', function() {
                httpBackend.when('GET', API_URL, {id: ID}).respond(dataId);
                ContactDetailsCtrl.get(ID);
                httpBackend.flush();
                expect(JSON.stringify(scope.contact)).toEqual(JSON.stringify(dataId));
            });

            it('Get one INVALID', function() {
                getUriHandler.respond(500);
                ContactDetailsCtrl.get(-1);
                httpBackend.flush();
                expect(JSON.stringify(scope.contact)).toEqual(JSON.stringify({}));
            });
        });

        describe(' Setters - ', function() {
            it('NEW VALID', function() {
                // change attribute
                httpBackend.when('POST', API_URL, dataId).respond(dataId);
                ContactDetailsCtrl.save(false, dataId, ID);
                httpBackend.flush();
                expect(JSON.stringify(scope.contact)).toEqual(JSON.stringify(dataId));
            });

            it('MODIFIED VALID', function() {
                // change attribute
                dataId.name = 'this is a test';
                httpBackend.when('POST', API_URL, dataId).respond(dataId);
                ContactDetailsCtrl.save(false, dataId, ID);
                httpBackend.flush();
                expect(JSON.stringify(scope.contact)).toEqual(JSON.stringify(dataId));
            });

            it('NEW INVALID', function() {
                // change attribute
                delete dataId.name;
                httpBackend.when('POST', API_URL, dataId).respond(500, {
                    'status':'error',
                    'message': 'Required name'
                });
                // by pass secuirty validty of forms
                ContactDetailsCtrl.save(false, dataId, ID);
                httpBackend.flush();
                expect(JSON.stringify(scope.message)).toEqual(JSON.stringify('Required name'));
            });

            it('MODIFIED INVALID', function() {
                // change attribute
                delete dataId.name;
                httpBackend.when('POST', API_URL, dataId);//.respond(dataId);
                ContactDetailsCtrl.save(false, dataId, ID);
                httpBackend.flush();
                expect(JSON.stringify(scope.message)).toEqual(JSON.stringify('Required name'));
            });
        });

        it('Delete', function() {
            // mock the delete call
            httpBackend.when('DELETE', API_URL, {id: ID}).respond({status: true});
            ContactDetailsCtrl.delete(ID); // trigger delete function event
            httpBackend.flush();
            expect(scope.contact).toBeUndefined();
        });
    });
});
