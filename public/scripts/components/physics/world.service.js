/**
 * Created by Luke on 2/26/2016.
 */
angular.module('badgrades')
    .factory('world', function(Physics) {
        var world = Physics();

        world.on('step', function( time ) {
            world.render();
        });

        return world;
    });
