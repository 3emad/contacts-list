'use strict';
angular.module('contantsListApp')
    .controller('ContactListCtrl', function(CONFIG, $injector, $rootScope, $scope) {
        // dynamically load enviorement of backend
        var ContactsListModelAPI = $injector.get(CONFIG[CONFIG.activeModel].service);
        $scope.loading = true;
        $scope.contactsList = [];

        ContactsListModelAPI.get().then(function(response) {
            $scope.loading = false;
            if (typeof response.$inst !== 'undefined') { // Firebase case
                $scope.contactsList = response;
            } else {
                $scope.contactsList = response.data.contacts;
            }
        });
    }
);
