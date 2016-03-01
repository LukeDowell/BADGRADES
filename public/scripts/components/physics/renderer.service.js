/**
 * Created by ldowell on 2/29/16.
 */
angular.module('badgrades')
    .factory('PixiRenderer', function(World) {

        /**
         * Creates a new PIXIJS renderer. An appropriate drawing
         * medium (canvas / webgl) is appended into the provided element
         *
         * @param canvasId
         *      The parent element for this renderer's medium
         * @constructor
         */
        var PixiRenderer = function(element) {

            this.WIDTH = 1200;
            this.HEIGHT = 800;

            /**
             * Various PIXIJS renderer options
             * @type {{}}
             */
            this.rendererOptions = {

                'antialias': true,
                'autoResize': false,
                'transparent': true,
                'clearBeforeRender': false
                //'resolution': 2,
                //'width': 0,
                //'height': 0,
                //'view': document.getElementById(canvasId)
                //'roundPixels': false
            };

            /**
             * PixiJS Stage
             * @type {undefined}
             */
            this.stage = undefined;

            /**
             * PixiJS renderer instance
             * @type {undefined}
             */
            this.renderer = undefined;

            /**
             * Canvas container
             */
            this.container = element;

            /**
             * 2d Canvas Context
             * @type {undefined}
             */
            this.context = undefined;

            this.init();
        };

        var proto = PixiRenderer.prototype;

        proto.init = function() {

            this.stage = new PIXI.Container();
            this.renderer = new PIXI.autoDetectRenderer(this.WIDTH, this.HEIGHT, this.rendererOptions, true);
            this.container.append(this.renderer.view);
            this.context = this.renderer.view.getContext('2d');

            console.log("PIXI JS RENDERER", this.renderer);

        };

        proto.render = function() {
            for(var i = 0; i < World.actors.length; i++) {
                var actor = World.actors[i];
                var body = World.bodies[i];

                var bodyPos = body.GetPosition();

                actor.position.x = bodyPos.x * World.SCALE;
                actor.position.y = bodyPos.y * World.SCALE;
                actor.rotation = body.GetAngle();

                //console.log("RENDERING ACTOR: " , actor , " FROM BODY " , body);

            }
            this.renderer.render(this.stage);
        };

        ////////////////////////////////
        // BOX2D DEBUG DRAW FUNCTIONS //
        ////////////////////////////////

        ///**
        // *
        // * @constructor
        // */
        //proto.DrawSegment = function() {
        //    console.log("DrawSegment" , arguments);
        //};
        //
        ///**
        // *
        // * @constructor
        // */
        //proto.DrawPolygon = function() {
        //    console.log("DrawPolygon" , arguments);
        //};
        //
        ///**
        // *
        // * @constructor
        // */
        //proto.DrawSolidPolygon = function() {
        //    console.log("DrawSolidPolygon" , arguments);
        //};
        //
        ///**
        // *
        // * @constructor
        // */
        //proto.DrawCircle = function() {
        //    console.log("DrawCircle" , arguments);
        //};
        //
        ///**
        // *
        // * @constructor
        // */
        //proto.DrawSolidCircle = function() {
        //    console.log("DrawSolidCircle" , arguments);
        //};
        //
        ///**
        // *
        // * @constructor
        // */
        //proto.DrawTransform = function() {
        //    console.log("DrawTransform" , arguments);
        //};

        return PixiRenderer;
    });
