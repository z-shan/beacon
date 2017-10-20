
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var beaconModel = new Schema({
    beak : {type: mongoose.Schema.Types.ObjectId, ref: 'Beak'},
    ipaddress : { type : String},
    useragent : { type : String},
    datetime : {type : Date, default: Date.now}
});

module.exports = mongoose.model('beacon', beaconModel);