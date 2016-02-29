/**
 * Created by ldowell on 2/29/16.
 */
angular.module('badgrades')
    .directive('blackboard', function(Blackboard) {
        'use strict';

        return {
            restrict: "EA",
            replace: true,
            scope: {},
            templateUrl: 'scripts/components/blackboard/directive/blackboard.directive.html',
            link: function(scope, element, attributes) {
                var blackboard = new Blackboard(scope, element, attributes);
                blackboard.update();
            }
        }
    });
