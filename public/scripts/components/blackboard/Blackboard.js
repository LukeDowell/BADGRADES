/**
 * Created by Luke on 2/26/2016.
 *
 * http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html
 * http://www.binarytides.com/mouse-joint-box2d-javascript/
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
             * TODO learn more about directive scopes
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
             *  MouseJoint, allows the user to interact with the blackboard
             * @type b2MouseJoint
             */
            this.mouseJoint = false;

            /**
             *  Whether or not the mouse is curretly pressed
             * @type {boolean}
             */
            this.mousePressed = false;

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

            debugDraw.SetSprite(this.renderer.context);
            debugDraw.SetDrawScale(SCALE);
            debugDraw.SetFillAlpha(0.2);
            debugDraw.SetLineThickness(2.0);
            debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);

            World.SetDebugDraw(debugDraw);

        };

        /**
         *  Connect the world to the renderer's event callbacks
         */
        proto.setupHandlers = function() {

            this.renderer.addEventListener('mouseup', this.onMouseUp.bind(this));
            this.renderer.addEventListener('mousedown', this.onMouseDown.bind(this));
            this.renderer.addEventListener('mousemove', this.onMouseMove.bind(this));

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
            fixDef.density = 1;
            fixDef.friction = 1;
            fixDef.restitution = 0.5;

            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(600 / SCALE, 25 / SCALE);

            // Top
            bodyDef.position.x = 600 / SCALE;
            bodyDef.position.y = 25 / SCALE;
            var ceiling = World.CreateBody(bodyDef);
            ceiling.CreateFixture(fixDef);

            World.bodies.push(ceiling);
            //World.actors.push({});

            ////////////////
            // BLACKBOARD //
            ////////////////

            // Blackboard
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            bodyDef.position.x = 600 / SCALE;
            bodyDef.position.y = 300 / SCALE;
            bodyDef.linearDamping = 0.3;

            fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(700 / 2 / SCALE, 400 / 2 / SCALE);
            fixDef.density = 0.5;

            var blackboardBody = World.CreateBody(bodyDef);
            blackboardBody.CreateFixture(fixDef);

            // Blackboard Sprite
            var blackboardSprite = new PIXI.Sprite.fromImage('media/images/blackboard.jpg');

            blackboardSprite.position.x = blackboardBody.GetPosition().x * SCALE;
            blackboardSprite.position.y = blackboardBody.GetPosition().y * SCALE;
            blackboardSprite.anchor.x = 0.5;
            blackboardSprite.anchor.y = 0.5;
            blackboardSprite.width = 700;
            blackboardSprite.height = 400;

            World.bodies.push(blackboardBody);
            //World.actors.push(blackboardSprite);

            //this.renderer.stage.addChild(blackboardSprite);


            // Chainz
            var leftChainCeilingAnchor = new Box2D.Common.Math.b2Vec2(-300 / SCALE, 25 / SCALE);
            var leftChainBoardAnchor = new Box2D.Common.Math.b2Vec2(300 / SCALE, 110 / SCALE);
            Chain(300, 50, ceiling, leftChainCeilingAnchor, blackboardBody, leftChainBoardAnchor);

            var rightChainCeilingAnchor = new Box2D.Common.Math.b2Vec2(300 / SCALE, 25 / SCALE);
            var rightChainBoardAnchor = new Box2D.Common.Math.b2Vec2(900 / SCALE, 110 / SCALE);
            Chain(300, 50, ceiling, rightChainCeilingAnchor, blackboardBody, rightChainBoardAnchor);

            console.log(blackboardBody);

            return this;
        };

        /**
         *
         * @param tStamp
         */
        proto.update = function( tStamp ) {
            var boundCallback = this.update.bind(this);
            window.requestAnimationFrame( boundCallback );

            World.Step(
                1 / 60, //frame rate
                10,     //velocity iterations
                10);    //position iterations

            // Update actors
            for(var i = 0; i < World.actors.length; i++) {
                var actor = World.actors[i];
                var body = World.bodies[i];

                var bodyPos = body.GetPosition();

                actor.position.x = bodyPos.x * SCALE;
                actor.position.y = bodyPos.y * SCALE;
                actor.rotation = body.GetAngle();

            }

            World.DrawDebugData();
            World.ClearForces();

            // Allows us to draw actors over the world, if need be
            this.renderer.context.save();
            this.renderer.render();
            this.renderer.context.restore();
        };

        //////////////////////////
        // MOUSE JOINT
        //////////////////////////

        proto.onMouseMove = function( event ) {
            var x = event.x / SCALE;
            var y = event.y / SCALE;

            var point = new Box2D.Common.Math.b2Vec2(x, y);

            if(this.mousePressed && !this.mouseJoint) {
                var body = World.getBodyAtPoint(x, y);

                if(body) {
                    var jointDef = World.createMouseJointDef(World.bodies[0], body, point);
                    this.mouseJoint = World.CreateJoint(jointDef);
                    body.SetAwake(true);
                }
            }

            if(this.mouseJoint) {
                this.mouseJoint.SetTarget(point);
            }
        };

        proto.onMouseUp = function( event ) {
            this.mousePressed = false;

            if(this.mouseJoint) {
                World.DestroyJoint(this.mouseJoint);
                this.mouseJoint = false;
            }
        };

        proto.onMouseDown = function( event ) {
            this.mousePressed = true;
        };

        return Blackboard;
    });

