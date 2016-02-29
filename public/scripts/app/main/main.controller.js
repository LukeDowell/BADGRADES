/**
 * Created by ldowell on 2/24/16.
 */
angular.module('badgrades')
    .controller('MainController', function(Physics, world, renderer, ticker, Chain) {

        world.add(renderer);

        // SETTINGS N SHIT
        var gravity = Physics.behavior('constant-acceleration', {
            acc: { x : 0, y : 0.0004 }
        });

        world.add(gravity);

        // LOGO
        var logo = PIXI.Sprite.fromImage('media/images/badgrades-white.png');
        logo.anchor = {
            x: 0.5,
            y: 0.5
        };
        logo.position = {
            x: renderer.width / 2,
            y: 50
        };
        logo.scale = {
            x: 0.4,
            y: 0.4
        };

        var oneChainz = new Chain(
            (renderer.width / 2) - 300,
            120);

        var twoChainz = new Chain(
            (renderer.width / 2) + 300,
            120);

        world.add(oneChainz.bodies);
        world.add(twoChainz.bodies);
        world.add(twoChainz.constraints);
        world.add(oneChainz.constraints);

        // LOGO
        renderer.stage.addChild(logo);

        ticker.start();
    });

function BadgradesLogo() {

}
