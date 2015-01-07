'use strict';
(function () {
    // special form filters
    angular.module('formHelpers', []).filter('text', function () {
        return {
            alphabetic: function (input) {
                return input.replace(/\W+/g, '');
            }
        };
    });
    // TODO could use $sce service here
    // TODO make types whiteList
    var directiveModule = angular.module('contantsListDirectives', [
        'formHelpers',
        'ngMessages'
    ]);
    directiveModule.controller('formInputController', function () {
    });
    // define all directives
    angular.forEach({
        'text': 'inputText',
        'tel': 'inputTel',
        'textarea': 'inputTextarea'
    }, function (directiveSelector, tpl) {
        directiveModule.directive(directiveSelector, ['textFilter', function (textFilter) {
            return {
                controller: 'formInputController',
                controllerAs: 'inputCtrl',
                templateUrl: 'views/forms/components/' + tpl + '.html',
                restrict: 'E',
                require: '^form',
                required: [
                    'ngModel',
                    'label'
                ],
                scope: {
                    label: '@',
                    ngModel: '='
                },
                link: function (scope, element, attrs, ngModel) {
                    scope.type = tpl;
                    scope.labelClean = textFilter.alphabetic(scope.label).toLowerCase();
                    scope.form = ngModel;    // passDown ngModelController for ngMessages
                }
            };
        }]);
    });
}());
