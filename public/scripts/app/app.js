'use strict';
angular.module('badgrades', ['ngAria', 'ui.router', 'ngMessages', 'ngMaterial'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        //Root state

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('site', {
                'abstract': true,
                'views': {
                    'navbar@': {
                        templateUrl: './scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                },
                'revolve': {

                }
            })
    }])

    // TODO Where else to put
    .value("Physics", Physics);
