/**
 * Created by ldowell on 2/24/16.
 */
'use strict';

angular.module('badgrades')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('blackboard', {
                parent: 'site',
                url: '/',
                data: {

                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/blackboard/blackboard.html',
                        controller: 'BlackboardController'
                    }
                },
                resolve: {

                }
            })
    }]);
