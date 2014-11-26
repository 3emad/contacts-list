'use strict';
angular.module('contantsListApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'contantsListDirectives'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/',
        views: {
            //'sideBar@': { templateUrl: 'views/components/sidebar.html', controller: 'SideBarCtrl' },
            'header': {
                templateUrl: 'views/components/header.html'
            },
            '@': {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            }
        }
    }).state('main.contact/list', {
        url: 'contact/list',
        views: {
            '@': {
                templateUrl: 'views/contact/list.html',
                controller: 'ContactListCtrl'
            }
        }
    }).state('main.contact/details', {
        url: 'contact/:id',
        views: {
            '@': {
                templateUrl: 'views/contact/details.html',
                controller: 'ContactDetailsCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/');
});
