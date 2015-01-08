'use strict';
// TODO allow scalibilty and registering other emits although its a bad practice
//      on rootScope (maybe not?)
angular.module('contantsListApp').factory('alertService', ['CONFIG', '$rootScope', '$timeout', '$mdToast', function (CONFIG, $rootScope, $timeout,  $mdToast) {
    var boradcaster = {};
    boradcaster.emit = function (event, data) {
        $rootScope.$emit(event, data);
    };
    boradcaster.on = function (event) {
        $rootScope.$on(event, function (event, message) {
            //$rootScope.message = message;
            $mdToast.show($mdToast.simple()
                .content(message)
                .position('top right left')
                .hideDelay(CONFIG.timeoutMessage)
            );
            // $timeout(function timeoutMessage() {
            //     $rootScope.message = '';
            // }, CONFIG.timeoutMessage);
        });
    };
    // register the gloabel
    boradcaster.on('headerAlert');
    return boradcaster;
}]);
