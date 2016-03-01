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
         *      The parent element for this renderer's view
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

            /**
             * idk if this will work
             * @type {*[]}
             */
            this.eventListeners = {};

            this.init();
        };

        var proto = PixiRenderer.prototype;

        proto.init = function() {
            this.stage = new PIXI.Container();
            this.renderer = new PIXI.autoDetectRenderer(this.WIDTH, this.HEIGHT, this.rendererOptions, true);
            this.container.append(this.renderer.view);
            this.context = this.renderer.view.getContext('2d');

            this.setupHandlers();

        };

        /**
         * Event router
         * @returns {proto}
         */
        proto.setupHandlers = function() {

            angular.element(this.renderer.view).on('click', function(event) {
                this.notifyListeners('click', event);
            }.bind(this));

            angular.element(this.renderer.view).on('mousemove', function(event) {
                this.notifyListeners('mousemove', event);
            }.bind(this));

            angular.element(this.renderer.view).on('mousedown', function(event) {
                this.notifyListeners('mousedown', event);
            }.bind(this));

            angular.element(this.renderer.view).on('mouseup', function(event) {
                this.notifyListeners('mouseup', event);
            }.bind(this));

            angular.element(this.renderer.view).on('mouseenter', function(event) {
                this.notifyListeners('mouseenter', event);
            }.bind(this));

            angular.element(this.renderer.view).on('mouseleave', function(event) {
                this.notifyListeners('mouseleave', event);
            }.bind(this));

            return this;
        };

        /**
         *
         * @param namespace
         *      A string denoting the type of event to listen to. Available
         *      values:
         *      'click', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave',
         *      'mousemove'
         *
         * @param callback
         *      The callback function to execute when an event triggers
         */
        proto.addEventListener = function(namespace, callback) {
            if(!this.eventListeners[namespace]) {
                this.eventListeners[namespace] = [];
            }
            this.eventListeners[namespace].push(callback);
        };

        /**
         *
         * @param namespace
         * @param event
         */
        proto.notifyListeners = function( namespace, event ) {
            var listeners = this.eventListeners[namespace];
            if(listeners && listeners.length > 0) {
                for(var i = 0; i < listeners.length; i++) {
                    listeners[i](event);
                }
            }
        };

        /**
         *
         */
        proto.render = function() {
            this.renderer.render(this.stage);
        };

        //////////////////////
        // EVENT HANDLERS
        //////////////////////



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
