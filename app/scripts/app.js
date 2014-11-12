'use strict';
angular.module('contantsListApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  }).state('/contact/list', {
    url: '/contact/list',
    templateUrl: 'views/contact/list.html',
    controller: 'ContactListCtrl'
  }).state('/contact/details', {
    url: '/contact/:id',
    templateUrl: 'views/contact/details.html',
    controller: 'ContactDetailsCtrl'
  });
  $urlRouterProvider.otherwise('/');
});