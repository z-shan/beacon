var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'), // reference to our app
    mongoose = require('mongoose'),
    Beak = mongoose.model('beak'), // get it from mongoose because its already loaded in mongoose
    agent =  request.agent(app), // actually use from supertest to execute http calls
    config = require('../config'),
    sinon = require('sinon'),
    logger = require('../logger').logger;

describe('Beak Test', function() {

    var beacon;

    describe('Post Beak', function() {
        it('should generate a beak and return a url',function(done) {
            var beakPost = {recipientemail: 'test@test.com'}
    
            agent.post('/beak/generate')
                .send(beakPost)
                .expect(200)
                .end(function(err,results) {
                    var urlarr = results.text.split('/');
                    beacon = urlarr[urlarr.length-1];
                    results.text.startsWith(config.base_url+/beak/);
                    done();
                });
        });
    
        it('should give an error if recipient email not passed in response body',function(done) {
            var beakPost = {};
    
            agent.post('/beak/generate')
                .send(beakPost)
                .expect(400)
                .end(function(err,results) {
                    results.text.should.equal("Recipient Email is required");
                    done();
                });
        });
    });

    afterEach(function(done) {
        Beak.remove().exec();
        done();
    });
});