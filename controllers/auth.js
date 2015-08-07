// Load required packages
var passport = require('passport');

//basic strategy response schema, so password is sent in the clear...
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, next) {
    //check if the supplied user exists
    User.findOne({ username: username }, function (err, user) {
      if (err) { return next(err); }

      // No user found with that username, no error
      if (!user) { return next(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        //error
        if (err) { return next(err); }

        // Password did not match
        if (!isMatch) { return next(null, false); }

        // Success, we return the user to the next middleware
        return next(null, user);
      });
    });
  }
));

//create a function named isAuthenticated
//tells passport to use basic strategy
//and set session to false to not store session variables
exports.isAuthenticated = passport.authenticate('basic', { session : false });