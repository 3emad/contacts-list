'use strict';
angular.module('contantsListApp').factory('contact/rest', function () {
  // Service logic
  // ...
  var meaningOfLife = 42;
  // Public API here
  return {
    someMethod: function () {
      return meaningOfLife;
    }
  };
});