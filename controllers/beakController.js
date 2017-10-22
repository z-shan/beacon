var path = require('path');
var config = require('../config');
var _ = require('lodash');

var beakController = function(Beak, Beacon, logger) {
    
    var get = function(req, res) {
        Beak.findOne({_id: req.params.beakCode}, function(err, beak) {
            if(err) {
                logger.info("Beak not found -"+req.params.beakCode);
                //console.log("Beak not found -"+req.params.beakCode);
                //res.sendFile(path.join(__dirname, '../images/1px.gif'));
                res.status(404);
                //res.send("Beak not found");
            } else if(beak) {
                var beacon = new Beacon({
                    beak : beak,
                    ipaddress : req.connection.remoteAddress,
                    useragent : req.headers['user-agent'],
                    datetime : new Date()
                });
                //console.log(req.headers['user-agent']);
                Beacon.find({beak: beak}, function(err, result) {
                    var restr = "";

                    if(result.length === 0) {
                        restr += "opened for first time from";
                    } else {
                        if(_.findIndex(result, {ipaddress: beacon.ipaddress, useragent: beacon.useragent}) >= 0) {
                            restr += "reopened from same device with"
                        } else {
                            restr += "reopened from another device with"
                        }
                    }

                    // this info can be emailed using nodemailer
                    logger.info("Email to recipient:"+beak.recipientemail+" "+restr+" ip - "+beacon.ipaddress+" at "+beacon.datetime);
                    console.log("Email to recipient:"+beak.recipientemail+" "+restr+" ip - "+beacon.ipaddress+" at "+beacon.datetime);
                    
                    beacon.save(function(err) {
                        if(err) {
                            console.log("Error saving beacon data");
                        }
                        res.sendFile(path.join(__dirname, '../images/1px.gif'));
                    });
                });
            } 
        });
    };

    var post = function(req, res) {
        var beak = new Beak(req.body);
        if(!req.body.recipientemail) {
            res.status(400);
            res.send('Recipient Email is required');
        } else {
            beak.save();
            logger.info("new beak generated");
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