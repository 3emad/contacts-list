'use strict';
// TODO allow scalibilty and registering other emits although its a bad practice
//      on rootScope
angular.module('contantsListApp').factory('alertService', ['CONFIG', '$rootScope', '$timeout', function (CONFIG, $rootScope, $timeout) {
    var boradcaster = {};
    boradcaster.emit = function (event, data) {
        $rootScope.$emit(event, data);
    };
    boradcaster.on = function (event) {
        $rootScope.$on(event, function (event, message) {
            $rootScope.message = message;
            $timeout(function timeoutMessage() {
                $rootScope.message = '';
            }, CONFIG.timeoutMessage);
        });
    };
    // register the gloabel
    boradcaster.on('headerAlert');
    return boradcaster;
}]);
