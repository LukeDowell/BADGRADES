/**
 * Created by Luke on 2/26/2016.
 */
angular.module('badgrades')
    .factory('Chain', function(World) {

        var SCALE = World.SCALE;
        var numLinks = 12;
        var linkLength = 20;
        var linkWidth = 10;

        var Chain = function(x, y, startBody, relativeStartAnchor, endBody, relativeEndAnchor) {


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
            fixDef.friction = 1;
            fixDef.restitution = 2;

            // Create the first body
            var link = startBody;

            // Create the chain
            for(var i = 1; i < numLinks; i++) {

                var yPos = y + (i * linkLength);
                bodyDef.position.x = x / SCALE;
                bodyDef.position.y = yPos / SCALE;

                var body = World.CreateBody(bodyDef);
                body.CreateFixture(fixDef);

                var jointVector = new Box2D.Common.Math.b2Vec2(x / SCALE, (yPos - linkLength) / SCALE);
                revoluteJoint.Initialize(link, body, jointVector);

                if(i === 1) {
                    revoluteJoint.localAnchorA = relativeStartAnchor;
                }

                World.CreateJoint(revoluteJoint);
                link = body;
            }

            revoluteJoint.Initialize(link, endBody, relativeEndAnchor);
            revoluteJoint.localAnchorA = new Box2D.Common.Math.b2Vec2(0, linkLength / SCALE);
            World.CreateJoint(revoluteJoint);

            // Last body
        };

        return Chain;
    });
