var should = require('should'),
    sinon = require('sinon'),
    config = require('../config');

describe('beak controller tests', function() {
    var logger = {
        info: sinon.spy(),
        error: sinon.spy()
    };

    var res = {
        status : sinon.spy(),
        send : sinon.spy()
    }

    describe('post', function() {
        it('should not allow an empty email on post', function() {
            var Beak = function(beak){this.save = function(){}};
            var Beacon = function(beacon) {this.save = function() {}};

            var req = {
                body : {
                    //recipientemail : 'test@test.com'
                }
            }

            var beakController = require('../controllers/beakController')(Beak, Beacon, logger);
            beakController.post(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith("Recipient Email is required").should.equal(true);
        });

        it('should return a url', function() {
            var Beak = function(beak){this.save = function(){}};

            var req = {
                body : {
                    recipientemail : 'test@test.com'
                }
            }

            var beakController = require('../controllers/beakController')(Beak, null, logger);
            beakController.post(req, res);

            res.status.calledWith(200).should.equal(true);
            res.send.calledWithMatch(config.base_url+'/beak/').should.equal(true);
        });
    });

    describe('get', function() {
        it('call with wrong beakid', function() {
            var Beacon = function(beacon) {this.save = function() {}};
            var req = {
                params : {
                    beakCode : '1234abc'
                }
            }

            var Beak1 = {
                'findOne' : function(params, cb) {
                    return cb(new Error(), null);
                }
            }

            var beakController1 = require('../controllers/beakController')(Beak1, Beacon, logger);
            beakController1.get(req, res);

            logger.info.calledWith('Beak not found -1234abc').should.equal(true);
        });

        it('first beacon', function() {

            var Beacon = require('../model/beakModel');
            Beacon.find = function(params, cb) {
                return cb(null, []);
            }
            Beacon.save = function() {}

            var req = {
                params : {
                    beakCode : '1234abc'
                },
                connection: {remoteAddress : '::1'},
                headers : {
                    'user-agent' : 'mocha'
                }
            }

            var Beak = {
                'findOne' : function(params, cb) {
                    return cb(null, {recipientemail: 'test@test.com'});
                }
            }

            var beakController1 = require('../controllers/beakController')(Beak, Beacon, logger);
            sinon.stub(console, 'log');
            beakController1.get(req, res);
            console.log.restore();

            logger.info.calledWithMatch('opened for first time from').should.equal(true);
        });
    });
});