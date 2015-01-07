'use strict';

describe('Directive: forms-elem', function() {

    // load the directive's module
    beforeEach(module('contantsListApp'));
    beforeEach(module('my.templates'));

    var element;
    var elementDirective;
    var scope;
    var scopeDirective;
    var compile;

    // input-[type]
    var formTypes = [
      {type: 'text',      label: 'Name:',       ngModel: 'name'},
      {type: 'tel',       label: 'Phone:',      ngModel: 'phone'},
      {type: 'textarea',  label: 'Address:',    ngModel: 'address'}
    ];

    var contact = {
        name: 'Leslee Matsuno',
        companyName: 'Factory Mattress Outlet',
        address: '1251 E Main St #990',
        city: 'Quebec',
        province: 'QC',
        postal: 'G1H 1A6',
        phone: '418-460-5773',
        country: 'Canada'
    };

    beforeEach(inject(function($injector) {

        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');

        scope = $rootScope.$new();
        compile = $compile;
    }));

    var compileDirective = function(inputType, html) {
        // initlize model
        scope.contact = contact;
        // create template
        element = angular.element(
            '<form name="detailsForm" ng-model-options="{ updateOn: \'submit\' }" ng-submit="save()" novalidate>' +
                 html +
            '</form>'
          );
        compile(element)(scope);
        scope.$apply();
        // to get isolated scope
        elementDirective = element.children('form-' + inputType).eq(0);
        scopeDirective = elementDirective.isolateScope();
    };

    describe(' - Abstract - ', function() {

        var abstractTest = function(formType) {
            var type = formType.type;
            var label = formType.label;
            var ngModel = formType.ngModel;

            describe(type, function() {
                it('Wrapper Class identical', function() {
                    // bind template and digest the scope
                    compileDirective(type, '<input-' + type + ' label="' + label + '" ng-model="contact.' + ngModel + '"></input-' + type + '>');
                    var template = element.find('div');
                    expect(template).toHaveClass('form-' + type);
                });

                it('Label matches set', function() {
                    // bind template and digest the scope
                    compileDirective(type, '<input-' + type + ' label="' + label + '" ng-model="contact.' + ngModel + '"></input-' + type + '>');
                    var template = element.find('label').html();
                    expect(template).toEqual(label);
                });

                it('Bindings isolation model - SET', function() {
                    compileDirective(type, '<input-' + type + ' label="' + label + '" ng-model="contact.' + ngModel + '"></input-' + type + '>');
                    expect(scopeDirective.ngModel).toEqual(scope.contact[ngModel]);
                });

                it('Bindings isolation model - UPDATE ', function() {
                    compileDirective(type, '<input-' + type + ' label="' + label + '" ng-model="contact.' + ngModel + '"></input-' + type + '>');
                    var value = 'This is a test';
                    if (type === 'tel') {
                        value = '416-111-1111';
                    }
                    scopeDirective.ngModel = value;
                    scopeDirective.$apply();

                    expect(scope.detailsForm[ngModel].$viewValue).toEqual(scope.contact[ngModel]);
                });

                it('Bindings isolation model - DELETE ', function() {
                    compileDirective(type, '<input-' + type + ' label="' + label + '" ng-model="contact.' + ngModel + '"></input-' + type + '>');
                    scopeDirective.ngModel = undefined;
                    scopeDirective.$apply();
                    expect(scopeDirective.ngModel).toEqual(scope.contact[ngModel]);
                });
            });
        };

        // run abstract test
        for (var i in formTypes) {
            abstractTest(formTypes[i]);
        }
    });
});
