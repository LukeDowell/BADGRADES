/**
 * Created by Luke on 2/26/2016.
 */
angular.module('badgrades')
    .factory('renderer', function(Physics) {
        var renderer = Physics.renderer('pixi', {
            el: 'blackboardContainer',
            width: 1200,
            height: 800,
            meta: false,
            autoResize: false,
            style: {

                color: '#FFFFFF'
            }
        });

        return renderer;
    });
