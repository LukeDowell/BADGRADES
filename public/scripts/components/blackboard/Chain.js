/**
 * Created by Luke on 2/26/2016.
 */
angular.module('badgrades')
    .factory('Chain', function() {

        var Chain = function(fixedPosition, endPosition) {
            var rigidConstraints = Physics.behavior('verlet-constraints', {
                iterations: 10
            });

            // the "basket"
            var bodies = [];
            for ( var i = fixedPosition; i < fixedPosition + endPosition; i += 5 ){

                l = bodies.push(
                    Physics.body('circle', {
                        x: i,

                        y: 1 + (i-fixedPosition),

                        radius: 1,

                        restitution: 0,

                        mass: 1000,

                        conf: 1
                    })
                );

                rigidConstraints.distanceConstraint( bodies[ l - 1 ], bodies[ l - 2 ], 2 );
            }
            bodies[0].treatment = 'static';

            return {
                bodies: bodies,
                constraints: rigidConstraints
            }
        };


        return Chain;
    });
