/**
 * Created by ldowell on 2/29/16.
 */

angular.module('badgrades')
    .factory('World', function() {

        /** Gravity vector */
        var GRAVITY = new Box2D.Common.Math.b2Vec2(0.0, -10.0);

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
             * be very big.
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
        };

        /*
         * Extend box2d world
         */
        World.prototype = new Box2D.Dynamics.b2World(GRAVITY, true);
        var proto = World.prototype;

        proto.addActor = function(id, actor) {
            this.actors[id] = actor;
        };

        function getInstance() {
            if(instance === null) {
                instance = new World();
            }
            return instance;
        }

        return getInstance();
    });
