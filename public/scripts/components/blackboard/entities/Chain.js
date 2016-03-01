/**
 * Created by Luke on 2/26/2016.
 */
angular.module('badgrades')
    .factory('Chain', function(World) {

        var Chain = function(x, y, numLinks, linkLength, linkWidth, end) {

            if(!linkLength) {
                linkLength = 20;
            }

            if(!linkWidth) {
                linkWidth = 10;
            }

            // Chain segment
            var bodyDef = new Box2D.Dynamics.b2BodyDef();
            bodyDef.position.x = x;
            bodyDef.position.y = y;

            var revoluteJoint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();

            var fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixDef.shape.SetAsBox(linkWidth / 2, linkLength / 2);
            fixDef.density = 100;
            fixDef.friction = 0.5;
            fixDef.restitution = 0.2;

            var link = World.CreateBody(bodyDef);
            link.CreateFixture(fixDef);

            for(var i = 1; i < numLinks; i++) {

                var yPos = (i * linkLength);
                bodyDef.position.x = x;
                bodyDef.position.y = yPos;

                var body = World.CreateBody(bodyDef);
                body.CreateFixture(fixDef);

                console.log(link);

                var jointVector = new Box2D.Common.Math.b2Vec2(x, y);
                revoluteJoint.Initialize(link, body, jointVector);
                World.CreateJoint(revoluteJoint);
                link = body;
            }
        };

        return Chain;
    });
