/**
 * Created by ldowell on 2/29/16.
 */

angular.module('badgrades')
    .factory('World', function() {

        var gravity = new Box2D.b2Vec2(0.0, -10.0);
        var world = new Box2D.b2World(gravity);

        return world;
    });
