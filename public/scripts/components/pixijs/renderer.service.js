/**
 * Created by ldowell on 2/29/16.
 */
angular.module('badgrades')
    .factory('PixiRenderer', function() {

        /**
         * Creates a new PIXIJS renderer. An appropriate drawing
         * medium (canvas / webgl) is appended into the provided element
         *
         * @param element
         *      The parent element for this renderer's medium
         * @constructor
         */
        var PixiRenderer = function(element) {

            /**
             * Various PIXIJS renderer options
             * @type {{}}
             */
            this.rendererOptions = {

                'antialias': true,
                'autoResize': false,
                'transparent': false,
                'resolution': 1

                //'width': 0,
                //'height': 0,
                //'view': 0,
                //'clearBeforeRender': true,
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
             * The element containing the pixi renderer
             * @type jqLite
             */
            this.container = element;

            this.init();
        };

        var proto = PixiRenderer.prototype;

        proto.init = function() {
            this.stage = new PIXI.Container();
            //TODO extract options out
            this.renderer = PIXI.autoDetectRenderer(1200, 800, this.rendererOptions, false);
            this.container.append(this.renderer.view);
        };

        proto.render = function() {
            this.renderer.render(this.stage);
        };


        ////////////////////////////////
        // BOX2D DEBUG DRAW FUNCTIONS //
        ////////////////////////////////

        /**
         *
         * @constructor
         */
        proto.DrawSegment = function() {
            console.log("DrawSegment" , arguments);
        };

        /**
         *
         * @constructor
         */
        proto.DrawPolygon = function() {
            console.log("DrawPolygon" , arguments);
        };

        /**
         *
         * @constructor
         */
        proto.DrawSolidPolygon = function() {
            console.log("DrawSolidPolygon" , arguments);
        };

        /**
         *
         * @constructor
         */
        proto.DrawCircle = function() {
            console.log("DrawCircle" , arguments);
        };

        /**
         *
         * @constructor
         */
        proto.DrawSolidCircle = function() {
            console.log("DrawSolidCircle" , arguments);
        };

        /**
         *
         * @constructor
         */
        proto.DrawTransform = function() {
            console.log("DrawTransform" , arguments);
        };

        return PixiRenderer;
    });
