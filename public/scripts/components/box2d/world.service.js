/**
 * Created by ldowell on 2/29/16.
 */

angular.module('badgrades')
    .factory('World', function() {

        console.log(Box2D);

        var gravity = new Box2D.Common.Math.b2Vec2(0.0, -10.0);
        var world = new Box2D.Dynamics.b2World(gravity, true); // Allow sleep

        return world;
    });
