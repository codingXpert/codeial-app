const User = require("../models/user");
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if(user) {
      return res.render("User_profile", {
        title: "User",
        profile_user: user
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error.message });
  }
};

module.exports.update = async function(req, res) {
  try {
    if(req.user.id === req.params.id) {
      await User.findByIdAndUpdate(req.params.id , req.body);
      req.flash('success', 'Profile Updated')
      return res.redirect("back")
    }else {
      req.flash('error', 'Failed to update')
      return res.status(401).send("unauthorized");
    }
  } catch (error) {
    return res.status(500).send({error:error});
  }
}

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
      req.flash('error', 'Password and confirm password should be same')
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      req.flash('error', 'Email Already Registered');
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
  req.flash('success', 'Logged In Successfully');
  return res.redirect('/'); 
};

// sign-out the session
module.exports.destroySession = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logged Out Successfully');
    return res.redirect("/");
  });
};
