const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; // helps to extract token from header
const User = require("../models/user");

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: "codeial"
}

passport.use(new JWTStrategy(opts, function(JWTPayload, done){
    User.findById(JWTPayload._id, function(err, user){
        if(err){console.log("error in finding user from JWT");return}

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;