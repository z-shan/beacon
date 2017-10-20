var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var config = require('./config');
var db = mongoose.connect(config.database);

/*if(process.env.ENV === 'Test') {
    db = mongoose.connect(config.database_test);
} else {
    
}*/

var Beak = require('./model/beakModel');
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var beakRouter = require('./routes/beakRoutes')(Beak);

app.use('/beak', beakRouter);

app.get('/', function(req, res) {
    res.send("Welcome to my Beacon API.");
});

app.listen(config.port, function(){
    console.log("Service running on port :" + config.port);
});


module.exports = app;