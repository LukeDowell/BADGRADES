/**
 * Created by ldowell on 2/29/16.
 */

angular.module('badgrades')
    .factory('World', function() {

        /* Gravity vector for box2d, can be acquired with World.GetGravity */
        var GRAVITY = new Box2D.Common.Math.b2Vec2(0.0, 20);
        var instance = null;

        /**
         *
         * @constructor
         */
        var World = function() {

            /**
             * Used to convert between physical and visual units for
             * box2d. 30 is the domain standard, and implies that something
             * of 3 pixels would be very small, while something of 300 pixels would
             * be very big. 30 pixels = 1 meter
             * @type {number}
             */
            this.SCALE = 30;

            /**
             * Visual elements associated with this world. Accessed by
             * index of the physics body
             *
             * @type {array}
             */
            this.actors = [];

            /**
             * Physics bodies associated with this world.
             * @type {Array}
             */
            this.bodies = [];

            /**
             * Whether or not this world has mouse joints enabled
             * @type {boolean}
             */
            this.interactive = true;

        };

        // extend b2world
        World.prototype = new Box2D.Dynamics.b2World(GRAVITY, true);
        var proto = World.prototype;

        /**
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @param isStatic
         */
        proto.createBox = function(x, y, width, height, isStatic) {
            var fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(
                width / 2 / this.SCALE,
                height / 2 / this.SCALE);

            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.position.x = x / this.SCALE;
            bodyDef.position.y = y / this.SCALE;

            if(isStatic === true) {
                bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
            } else {
                bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            }

            var body = this.CreateBody(bodyDef);
            body.CreateFixture(fixDef);

            return body;
        };

        /**
         * @param ground
         * @param body
         * @param target
         */
        proto.createMouseJointDef = function(ground, body, target) {
            var mouseJointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();

            mouseJointDef.bodyA = ground;
            mouseJointDef.bodyB = body;
            mouseJointDef.target = target;

            mouseJointDef.collideConnected = true;
            mouseJointDef.maxForce = 1000 * body.GetMass();
            mouseJointDef.dampingRatio = 0;

            return mouseJointDef;
        };

        /**
         * TODO Not accurate, slightly off
         * @param x
         * @param y
         */
        proto.getBodyAtPoint = function(x, y) {
            var mouse_p = new Box2D.Common.Math.b2Vec2(x, y);
            var aabb = new Box2D.Collision.b2AABB();

            aabb.lowerBound.Set(x - 0.001, y - 0.001);
            aabb.upperBound.Set(x + 0.001, y + 0.001);

            var body = null;

            // Query the world for overlapping shapes.
            function GetBodyCallback(fixture)
            {
                var shape = fixture.GetShape();

                if (fixture.GetBody().GetType() != Box2D.Dynamics.b2Body.b2_staticBody)
                {
                    var inside = shape.TestPoint(fixture.GetBody().GetTransform(), mouse_p);

                    if (inside)
                    {
                        body = fixture.GetBody();
                        return false;
                    }
                }

                return true;
            }

            this.QueryAABB(GetBodyCallback, aabb);
            return body;
        };

        function getInstance() {
            if(instance === null) {
                instance = new World();
            }
            return instance;
        }

        return getInstance();
    });
