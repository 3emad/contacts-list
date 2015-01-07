'use strict';

// data from // sample data cleaned up is from http://www.briandunning.com/sample-data/
angular.module('contantsListApp')
    .factory('ContactsListModel', function ContactGet(CONFIG, Firebase, $firebase) {
        var firebaseInst = new Firebase (CONFIG.Firebase.host + 'contacts');
        // create an AngularFire reference to the data
        var sync = $firebase(firebaseInst);
        var contactList = [];
        var contactListSync;

        // REST OPERATIONS
        var get = function(ID) {
            // get only single
            if (ID) {
                // make sure data is loaded
                if (contactList.length === 0) {
                    var contactListRef = $firebase(firebaseInst.child(ID));
                    contactListSync = contactListRef.$asObject();
                }
                return contactListSync.$loaded();
            }

            // download the data into a local object
            contactListSync = sync.$asArray();
            return contactListSync.$loaded();
        };

        var dataStructure = ['name', 'phone'];
        var save = function(dataSync, ID) {
            for (var i in dataStructure) {
                // check if data is valid
                if (typeof dataSync[dataStructure[i]] === 'undefined') {
                    return false;
                }
            }
            // make sure they are consistent
            if (dataSync.$id === ID) {
                return dataSync.$save();
            }
            // new contact
            return sync.$push(dataSync);
        };

        var remove = function(ID) {
            if (contactListSync.$id === ID) {
                contactListSync.$remove(); // remove the data
                return contactListSync.$save(); // save it locally and on firebase
            }
        };

        // return FIREBASE REST
        return {
            get: get,
            save: save,
            remove: remove
        };
    }
);
