/**
 * Created by Luke on 2/26/2016.
 *
 * http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html
 *
 */
angular.module('badgrades')
    .factory('Blackboard', function(World, PixiRenderer) {

        /**
         * TODO: Documentation
         * @param scope
         * @param element
         * @param attributes
         * @constructor
         */
        var Blackboard = function(scope, element, attributes) {
            console.log(scope, element, attributes);

            /**
             * TODO what is this
             */
            this.scope = scope;

            /**
             * JQLite element belonging to the directive that created this
             * object
             */
            this.element = element;

            /**
             * The attributes that were attached to the directive that created this
             * object
             */
            this.attributes = attributes;

            /**
             * This blackboard's renderer
             * @type PixiRenderer
             */
            this.renderer = undefined;

            /**
             * An array of all the physics bodies managed by the Box2D world
             * @type {Array}
             */
            this.bodies = [];

            /**
             * An array of all the visual actors on our pixijs stage
             * @type {Array}
             */
            this.actors = [];

            this.init();
        };

        var proto = Blackboard.prototype;

        /**
         * Set up the world
         */
        proto.init = function() {
            this.renderer = new PixiRenderer(this.element);
            World.SetDebugDraw(this.renderer);

            this.setupHandlers()
                .populateWorld();

            var debugDraw = new Box2D.Dynamics.b2DebugDraw();
            debugDraw.SetSprite(document.getElementById('canvas').getContext('2d'));
            debugDraw.SetDrawScale(1);
            debugDraw.SetFillAlpha(1);
            debugDraw.SetLineThickness(2.0);
            debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);

            console.log(debugDraw);

            World.SetDebugDraw(debugDraw);
        };

        /**
         *
         */
        proto.setupHandlers = function() {
            return this;
        };

        /**
         * Populates our world with physics objects, like
         * the chains holding our blackboard and the actual blackboard
         * itself
         */
        proto.populateWorld = function() {

            var fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.density = 1.0;
            fixDef.friction = 0.5;
            fixDef.restitution = 0.2;

            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

            bodyDef.position.x = 600;
            bodyDef.position.y = 775;

            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(600, 25);

            World.CreateBody(bodyDef).CreateFixture(fixDef);

            return this;
        };

        /**
         * The update/render loop
         */
        proto.update = function( tStamp ) {


            World.Step(
                1 / 60, //frame rate
                10,     //velocity iterations
                10);    //position iterations
            World.DrawDebugData();
            World.ClearForces();

            this.renderer.render();


            var boundCallback = this.update.bind(this);
            window.requestAnimationFrame( boundCallback );
        };


        return Blackboard;
    });

