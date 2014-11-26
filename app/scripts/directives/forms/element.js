'use strict';

(function() {
    // isolation for those variables as they are only needed here
    var scripts = document.getElementsByTagName('script');
    var currentScriptPath = scripts[scripts.length - 1].src.replace('element.js', '');

    // special form filters
    angular.module('formHelpers', []).filter('text', function() {
        return {
            alphabetic: function(input) {
                return input.replace(/\W+/g, '');
            }
        };
    });

    angular.module('contantsListDirectives', ['formHelpers']).directive('formElem', function($log, textFilter) {
        return {
            restrict: 'E',
            require: '^form',
            //required: ['ngModel', 'label'],
            //transclude: true,
            scope: {
                'label': '@',
                'ngModel': '='
            },
            // templateUrl: function(elem, attrs) {
            //     // $log.info(currentScriptPath + 'types/' + attrs.type + '.html');

            //     var whiteList = ['input', 'textarea', 'tel'];
            //     if (typeof attrs.type === 'undeifned' || whiteList.indexOf(attrs.type) === -1) {
            //         $log.error('Undefined directive type!');
            //         return false;
            //     }
            //     return currentScriptPath + 'types/' + attrs.type + '.html';
            // },

            /**
             * Need to assure its dynamic with label and required fields
             *
             * Note: You do not currently have the ability to access scope variables from the templateUrl function, since the template is requested before the scope is initialized.
             * ref. https://docs.angularjs.org/guide/directive
             */
            // link: function($scope, element) {
            //     $scope.Form = angular.element('form').parent();
            // }

            link: function(scope, element, attrs, ctrl) {
                console.log(ctrl);
                scope.labelClean = textFilter.alphabetic(scope.label);
                scope.template = currentScriptPath + 'types/' + attrs.type + '.html';
                // scope.Form = angular.element(element).parents('form')[0].name;
                scope.Form = ctrl;

            },
            template: '<div ng-include="template"></div>'
        };
    });
})();
