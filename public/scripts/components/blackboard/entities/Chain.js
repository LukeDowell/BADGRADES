/**
 * Created by Luke on 2/26/2016.
 */
angular.module('badgrades')
    .factory('Chain', function(World) {

        var SCALE = World.SCALE;

        var Chain = function(x, y, numLinks, linkLength, linkWidth, end) {

            if(!linkLength) {
                linkLength = 20;
            }

            if(!linkWidth) {
                linkWidth = 10;
            }

            // Chain segment
            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.position.x = x / SCALE ;
            bodyDef.position.y = y / SCALE;
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

            // Joint definition
            var revoluteJoint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();

            // Fixture
            var fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(linkWidth / 2 / SCALE, linkLength / 2 / SCALE);
            fixDef.density = 100;
            fixDef.friction = 0.5;
            fixDef.restitution = 0.2;

            // Create the first body
            var link = World.CreateBody(bodyDef);
            link.CreateFixture(fixDef);

            // Create the chain
            for(var i = 1; i < numLinks; i++) {

                var yPos = y + (i * linkLength);
                bodyDef.position.x = x / SCALE;
                bodyDef.position.y = yPos / SCALE;

                var body = World.CreateBody(bodyDef);
                body.CreateFixture(fixDef);

                var jointVector = new Box2D.Common.Math.b2Vec2(x / SCALE, (yPos - linkLength) / SCALE);
                revoluteJoint.Initialize(link, body, jointVector);
                World.CreateJoint(revoluteJoint);
                link = body;
            }
        };

        return Chain;
    });
