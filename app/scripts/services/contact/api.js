'use strict';
// data from // sample data cleaned up is from http://www.briandunning.com/sample-data/
angular.module('contantsListApp').factory('ContactsListModelAPI', ['CONFIG', '$http', '$q', function ContactGet(CONFIG, $http, $q) {
    var API_URL = CONFIG.API.host + 'contacts';
    // REST OPERATIONS
    var get = function (ID) {
        // get only single
        if (ID) {
            return $http.get(API_URL, { id: ID });
        }
        // download the data into a local object
        return $http.get(API_URL);
    };
    var dataStructure = [
        'name',
        'phone'
    ];
    var save = function (data, ID) {
        // FIXME duplicate name will break it since I'm depending my update
        // on "name" instead of unqiue ID
        for (var i in dataStructure) {
            // check if data is valid
            if (typeof data[dataStructure[i]] === 'undefined') {
                return $q.reject({
                    status: false,
                    message: 'Required ' + [dataStructure[i]]
                });
            }
        }
        if (ID) {
            return $http.post(API_URL, {
                data: data,
                id: ID
            });
        }
        return $http.post(API_URL, data);
    };
    var remove = function (data, ID) {
        return $http.delete(API_URL, { id: ID });
    };
    // return FIREBASE REST
    return {
        get: get,
        save: save,
        remove: remove
    };
}]);
