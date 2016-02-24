'use strict';

angular.module('badgrades')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('main', {
                parent: 'site',
                url: '/',
                data: {

                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    }
                },
                resolve: {

                }
            })
    }]);
