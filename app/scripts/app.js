'use strict';
angular.module('contantsListApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'contantsListDirectives',
    'firebase',
    'ngMessages',
    'ngMaterial'
]).constant('CONFIG', {
    // cloud development
    Firebase: {
        host: 'https://vivid-fire-1462.firebaseio.com/',
        secret: 'GqX862HRsBGG1B7WzUOSpT3gUt0O3atmDqiJ3R2u', // please don't misuse it :)
        service: 'ContactsListModel'
    },
    // production
    API: {
        host: 'https://dummy.com/',
        service: 'ContactsListModelAPI'
    },
    token: 'thisisasecrettoken',
    activeModel: 'Firebase',
    timeoutMessage: 1000
}).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/',
        views: {
            //'sideBar@': { templateUrl: 'views/components/sidebar.html', controller: 'SideBarCtrl' },
            'header': { templateUrl: 'views/components/header.html' },
            'content@': {
                templateUrl: 'views/contact/list.html',
                controller: 'ContactListCtrl',
                controllerAs: 'ListCtrl'
            },
            //'actions': { templateUrl: 'views/components/actions.html' }
        }
    }).state('main.details', {
        url: 'contact/:id',
        views: {
            'content@': {
                templateUrl: 'views/contact/details.html',
                controller: 'ContactDetailsCtrl',
                controllerAs: 'DetailsCtrl'
            }
        }
    }).state('main.add', {
        url: 'contact',
        views: {
            'content@': {
                templateUrl: 'views/contact/details.html',
                controller: 'ContactDetailsCtrl',
                controllerAs: 'DetailsCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/');
}]);
