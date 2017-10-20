
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var beakModel = new Schema({
    recipientemail : {
        type : String
    }
});

module.exports = mongoose.model('beak', beakModel);