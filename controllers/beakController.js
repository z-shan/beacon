var path = require('path');
var config = require('../config');

var beakController = function(Beak) {
    var Beacon = require('../model/beaconModel');
    
    var get = function(req, res) {
        Beak.findOne({_id: req.params.beakCode}, function(err, beak) {
            if(err) {
                console.log("Beak not found");
                res.status(404);
            } else if(beak) {
                var beacon = new Beacon({
                    beak : beak,
                    ipaddress : req.connection.remoteAddress,
                    datetime : new Date()
                });

                console.log("Email to recipient:"+beak.recipientemail+" opened from ip - "+beacon.ipaddress+" at "+beacon.datetime);
                beacon.save(function(err) {
                    if(err) {
                        console.log("Error saving beacon data");
                    }
                    res.sendFile(path.join(__dirname, '../images/1px.gif'));
                });
            } 
        });
    };

    var post = function(req, res) {

        console.log("posting..", req.body.recipientemail);
        var beak = new Beak(req.body);
        if(!req.body.recipientemail) {
            res.status(400);
            res.send('Recipient Email is required');
        } else {
            beak.save();
            res.status(200);
            res.send(config.base_url+'/beak/'+beak._id);
        }
    };

    return {
        get : get,
        post : post
    }
}

module.exports = beakController;