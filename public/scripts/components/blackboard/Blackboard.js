/**
 * Created by Luke on 2/26/2016.
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

            // Make the ground
            var shape = new Box2D.b2EdgeShape();
            shape.Set(new Box2D.b2Vec2(-600.0, 0.0), new Box2D.b2Vec2(600, 0.0));

            var ground = World.CreateBody(new Box2D.b2BodyDef());
            ground.CreateFixture(shape, 0.0);

            shape = new Box2D.b2PolygonShape();
            shape.SetAsBox(0.1, 1.0);

            var fixtureDef = new Box2D.b2FixtureDef();
            fixtureDef.set_shape(shape);
            fixtureDef.set_density(20.0);
            fixtureDef.set_friction(0.1);

            var bodyDef = new Box2D.b2BodyDef();
            bodyDef.set_type(Module)

            return this;
        };

        /**
         * The update/render loop
         */
        proto.update = function() {
            //TODO apparently this is slow
            var boundCallback = this.update.bind(this);
            requestAnimationFrame(boundCallback);

            // Framerate, ? , ?
            World.Step(1 / 60, 3, 3);
            this.renderer.render();
        };


        return Blackboard;
    });

