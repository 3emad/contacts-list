'use strict';
angular.module('contantsListApp').controller('ContactListCtrl', function ($scope, ContactsListModel) {
    $scope.contactsList = ContactsListModel;
});