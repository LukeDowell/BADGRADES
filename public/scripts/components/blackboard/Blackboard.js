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
            fixDef.density = 200;
            fixDef.friction = 25;
            fixDef.restitution = 10;

            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(600 / SCALE, 25 / SCALE);

            // Top
            bodyDef.position.x = 600 / SCALE;
            bodyDef.position.y = 25 / SCALE;
            var ceiling = World.CreateBody(bodyDef);
            ceiling.CreateFixture(fixDef);


            ////////////////
            // NOT GROUND //
            ////////////////

            // Blackboard
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            bodyDef.position.x = 600 / SCALE;
            bodyDef.position.y = 300 / SCALE;
            bodyDef.linearDamping = 0.25;

            fixDef.shape.SetAsBox(700 / 2 / SCALE, 400 / 2 / SCALE);
            fixDef.density = 10;
            var blackboardBody = World.CreateBody(bodyDef);
            blackboardBody.CreateFixture(fixDef);

            // Chainz
            // Left
            var leftChainCeilingAnchor = new Box2D.Common.Math.b2Vec2(-300 / SCALE, 25 / SCALE);
            var leftChainBoardAnchor = new Box2D.Common.Math.b2Vec2(300 / SCALE, 110 / SCALE);
            //var leftChainBoardAnchor = new Box2D.Common.Math.b2Vec2(-360 / SCALE, -210 / SCALE);
            Chain(300, 50, ceiling, leftChainCeilingAnchor, blackboardBody, leftChainBoardAnchor);

            var rightChainCeilingAnchor = new Box2D.Common.Math.b2Vec2(300 / SCALE, 25 / SCALE);
            var rightChainBoardAnchor = new Box2D.Common.Math.b2Vec2(900 / SCALE, 110 / SCALE);
            //var leftChainBoardAnchor = new Box2D.Common.Math.b2Vec2(-360 / SCALE, -210 / SCALE);
            Chain(300, 50, ceiling, rightChainCeilingAnchor, blackboardBody, rightChainBoardAnchor);

            //// Right
            //var leftChainCeilingAnchor = new Box2D.Common.Math.b2Vec2(-300 / SCALE, -12.5 / SCALE);
            //var leftChainBoardAnchor = new Box2D.Common.Math.b2Vec2(-350 / SCALE, -200 / SCALE);
            //Chain(ceiling, leftChainCeilingAnchor, blackboardBody, leftChainBoardAnchor);




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

