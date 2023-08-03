const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log("Error in finding user --> passport");
        return done(err);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies(when user login it stores user_id in cookies)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing the user from the key in the cookies(when user_id is sent back from the browser's cookies it fetches the user)
passport.deserializeUser(async (id, done) => {   
  const user = await User.findById(id);
  if (!user) {
    console.log("Error in finding user --> Passport");
  }
  return done(null, user);
});
module.exports = passport;