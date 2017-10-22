var express = require('express');

var routes = function(Beak, Beacon, logger) {
    var beakRouter = express.Router();
    var beakController = require('../controllers/beakController')(Beak, Beacon, logger);

    beakRouter.route('/generate')
        .post(beakController.post);

    beakRouter.route('/:beakCode')
        .get(beakController.get);

    return beakRouter;
};

module.exports = routes;