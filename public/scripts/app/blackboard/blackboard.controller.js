/**
 * Created by ldowell on 2/24/16.
 */
angular.module('badgrades')
    .controller('BlackboardController', function() {
        console.log("Blackboard Controller Starting");

        var stage = new PIXI.Stage(0x66FF99);
        var canvas = document.getElementById('canvas');
        var renderer = PIXI.autoDetectRenderer(800, 800, { view: canvas });
    });
