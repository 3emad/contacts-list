'use strict';

angular.module('contantsListApp').factory('contact/rest', function () {
    // Service logic
    // ...
    var dictionary = [
        {
            'fname': 'Randy',
            'lname': 'Johnson',
            'location': 'Seattle, WA'
        },
        {
            'fname': 'Andy',
            'lname': 'Pettite',
            'location': 'Bronx, NY'
        },
        {
            'fname': 'Jon',
            'lname': 'Lester',
            'location': 'Boston, MA'
        }
    ];
    // Public API here
    return {
        $get: function () {
            return dictionary;
        }
    };
});