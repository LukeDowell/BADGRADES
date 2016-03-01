/**
 * Created by Luke on 2/26/2016.
 *
 * http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html
 *
 */
angular.module('badgrades')
    .factory('Blackboard', function(World, PixiRenderer, Chain) {

        var SCALE = World.SCALE;

        /**
         * TODO: Documentation
         * @param scope
         * @param element
         * @param attributes
         * @constructor
         */
        var Blackboard = function(scope, element, attributes) {

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

            this.init();
        };

        var proto = Blackboard.prototype;

        /**
         * Set up the world
         */
        proto.init = function() {
            this.renderer = new PixiRenderer(this.element);

            this.setupHandlers()
                .populateWorld();

            var debugDraw = new Box2D.Dynamics.b2DebugDraw();

            debugDraw.SetSprite(document.getElementById('canvas').getContext('2d'));
            debugDraw.SetDrawScale(SCALE);
            debugDraw.SetFillAlpha(0.2);
            debugDraw.SetLineThickness(2.0);
            debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);

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

            ////////////
            // GROUND //
            ////////////

            var fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.density = 1.0;
            fixDef.friction = 0.5;
            fixDef.restitution = 0.2;

            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(600 / SCALE, 25 / SCALE);

            // Bottom
            bodyDef.position.x = 600 / SCALE;
            bodyDef.position.y = 775 / SCALE;
            World.CreateBody(bodyDef).CreateFixture(fixDef);

            // Top
            bodyDef.position.x = 600 / SCALE;
            bodyDef.position.y = 25 / SCALE;
            World.CreateBody(bodyDef).CreateFixture(fixDef);

            // Left
            fixDef.shape.SetAsBox(25 / SCALE, 600 / SCALE);

            bodyDef.position.x = 25 / SCALE;
            bodyDef.position.y = 400 / SCALE;
            World.CreateBody(bodyDef).CreateFixture(fixDef);

            // Right
            bodyDef.position.x = 1175 / SCALE;
            bodyDef.position.y = 400 / SCALE;
            World.CreateBody(bodyDef).CreateFixture(fixDef);

            Chain(300,
                200,
                10,
                20,
                10);

            World.createBox(400 / SCALE,
                400 / SCALE,
                50 / SCALE,
                50 / SCALE);

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

            // TODO read that this is super slow
            var boundCallback = this.update.bind(this);
            window.requestAnimationFrame( boundCallback );
        };


        return Blackboard;
    });

