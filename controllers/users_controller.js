const User = require("../models/user");
module.exports.profile = async function (req, res) {
  try {
    return res.render("User_profile", {
      title: "User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error.message });
  }
};

//render the signUp page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the signup data
module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    if (error.name.toLowerCase() === "validationerror") {
      return res.status(500).json({ Error: error.message });
    }
    return error;
  }
};

//sign in and create session for the user
module.exports.createSession = async function (req, res) {
  return res.redirect('/'); 
};

// sign-out the session
module.exports.destroySession = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    return res.redirect("/");
  });
};
