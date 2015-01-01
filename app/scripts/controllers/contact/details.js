'use strict';
angular.module('contantsListApp').controller('ContactDetailsCtrl', function($scope, $stateParams, ContactsListModel) {
    $scope.contact = ContactsListModel[$stateParams.id] || {};
    $scope.contact.$save = function() {
    	debugger;
        window.alert('test');
    };
});