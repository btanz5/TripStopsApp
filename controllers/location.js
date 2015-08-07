//load the Location model
var Location = require('../models/location');
var User = require('../models/user');
var mongoose = require('../node_modules/mongoose');

/*
    POST Locations
*/
exports.postLocations = function(req, res) {
    var location = new Location();

    location.latitude = req.body.latitude;
    location.longitude = req.body.longitude;

    location.markerName = req.body.markerName;

    location.userId = req.user._id;

    // Set the location properties that came from the POST data
    console.log("Marker Name: "req.body.markerName);
    console.log("Latitude: "req.body.latitude);
    console.log("Longitude: "req.body.longitude);

    // Save the location and check for errors
    location.save(function(err) {
        if (err){
            res.send(err);
            return;
        }

        res.json({
            success: 'Location added successfully',
            data: location
        });
    });
};

/*
    GET Locations
*/
exports.getLocations = function(req, res) {
    // Use the Location model to find all locations
    // from particular user with their username
    Location.find({}).lean().exec(function(err, locations) {
        if(err){
            res.send(err);
            return;
        }

        var counter = 0;
        var l = locations.length;

        //create a closure to have access to the location
        var closure = function(location){

            return function(err, user){

                counter++;

                if(err)
                    res.send(err);

                location.username = user.username;

                //when all the users have been set
                if(counter === l ) {
                    res.json(locations);
                    return;
                }           
            };
        };

        //iterate through all locations to find their associated username.
        for (var i = 0; i < l; i++) {
            User.findById(locations[i].userId, closure(locations[i]));
        }
    });
};

// **********************************
// GET a Location
// **********************************
// endpoint /api/locations/:location_id for GET
exports.getLocation = function(req, res) {
    // Use the Location model to find a specific location
    console.log(req.user._id);
    Location.find({
        userId: req.user._id,
        _id: req.params.location_id
    }, function(err, location) {
        if (err)
            res.send(err);

        res.json(location);
    });
};
