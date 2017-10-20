var express = require('express');


var routes = function(Beak) {
    var beakRouter = express.Router();
    var beakController = require('../controllers/beakController')(Beak);

    beakRouter.route('/generate')
        .post(beakController.post);

    beakRouter.route('/:beakCode')
        .get(beakController.get);

    return beakRouter;
};

module.exports = routes;