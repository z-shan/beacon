var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    logger = require('./logger').logger;

var config = require('./config');
var db;

if(process.env.ENV === 'test') {
    db = mongoose.connect(config.database_test);
} else {
    mongoose.connect(config.database);
}

var Beak = require('./model/beakModel'),
    Beacon = require('./model/beaconModel'),
    app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var beakRouter = require('./routes/beakRoutes')(Beak, Beacon, logger);

app.use('/beak', beakRouter);

app.get('/', function(req, res) {
    res.send("Welcome to my Beacon API.");
});

app.listen(config.port, function(){
    logger.info("Service running on port :" + config.port);
    console.log("Service running on port :" + config.port);
});


module.exports = app;