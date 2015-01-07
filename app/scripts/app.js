'use strict';

angular.module('contantsListApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'contantsListDirectives',
    'firebase',
    'ngMessages'
]).constant('CONFIG', {
    // cloud development
    Firebase: {
        host: 'https://vivid-fire-1462.firebaseio.com/',
        secret: 'GqX862HRsBGG1B7WzUOSpT3gUt0O3atmDqiJ3R2u',
        service: 'ContactsListModel'
    },
    // production
    API: {
        host: 'https://dummy.com/',
        service: 'ContactsListModelAPI'
    },
    token:      'thisisasecrettoken',
    activeModel:'Firebase',
    timeoutMessage: 1000
}).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('main', {
        url: '/',
        views: {
            //'sideBar@': { templateUrl: 'views/components/sidebar.html', controller: 'SideBarCtrl' },
            'header': {
                templateUrl: 'views/components/header.html',
            },
            '@': {
                templateUrl: 'views/contact/list.html',
                controller: 'ContactListCtrl',
                controllerAs: 'ListCtrl'
            }
        }
    })
    .state('main.details', {
        url: 'contact/:id',
        views: {
            '@': {
                templateUrl: 'views/contact/details.html',
                controller: 'ContactDetailsCtrl',
                controllerAs: 'DetailsCtrl'
            }
        }
    }).state('main.add', {
        url: 'contact',
        views: {
            '@': {
                templateUrl: 'views/contact/details.html',
                controller: 'ContactDetailsCtrl',
                controllerAs: 'DetailsCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/');
});
