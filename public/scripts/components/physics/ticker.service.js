angular.module('badgrades')
    .factory('ticker', function(Physics, world) {
        var start = function() {
            Physics.util.ticker.on( function( time ) {
                world.step(time);
            });

            Physics.util.ticker.start();
        };

        return {
            start: start
        }
    });
