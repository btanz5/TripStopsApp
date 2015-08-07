// modules
var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	passport = require('passport');

//create express app
var	app = express();

//create express router
var router = express.Router();

// Connect to the Mongo database
//    currently set to a local database: mapAppData, 
//      will switch to MongoLab for production
// mongoose.connect("mongodb://localhost:27017/mapAppData");
mongoose.connect("mongodb://bTanz5:mi$$B20051985@ds057862.mongolab.com:57862/trip_stops_db");

//set the port
var port = process.env.PORT || 3000; 

//import controllers
var locationController = require('./controllers/location');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

//allows a JSON-like experience with urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
}));

// Use the passport package in application
app.use(passport.initialize());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public/')); 

// endpoint handlers for /locations
router.route('/locations')
  .post(authController.isAuthenticated, locationController.postLocations)
  .get(locationController.getLocations);

// endpoint handlers for /Locations/:Location_id
router.route('/locations/:location_id')
  .get(authController.isAuthenticated, locationController.getLocation)

// endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// endpoint handler for authenticating users
router.route('/authenticate')
  .post(userController.authenticateUser);

// Register all our routes with /api
app.use('/api', router);

//app will listen for the port number and 
//display in the terminal if its listening
app.listen(port);	
console.log("TripStopsApp listening on Port: "  + port); 
exports = module.exports = app; 					



