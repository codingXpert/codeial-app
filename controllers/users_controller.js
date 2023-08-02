const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

//render the signUp page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the signIn page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the signup data
// module.exports.create = async function (req, res) {
//     try {
//     //   if (req.body.password !== req.body.confirm_password) {
//     //     return res.redirect("back");
//     //   }
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) {
//         const newUser = await User.create({
//           email: req.body.email,
//           password: req.body.password,
//         });
//         return res.redirect("/users/sign-in");
//       } else {
//         return res.redirect("back");
//       }
//     } catch (error) {
//       if (error.name.toLowerCase() === "validationerror") {
//         return res.status(500).json({ Error: error.message });
//       }
//       return error;
//     }
//   };

module.exports.create = async (req, res) => {
    try {
      // check user password is confirm or not
      if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
      }
          

      // find user by email
      const user = await User.findOne({ email: req.body.email });
      //  find user if user is not created then create a new user
      if (!user) {
        const newUser = await User.create(req.body);
        return res.redirect("/users/sign-in");
      } else {
        return res.redirect("back");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
//sign in and create session for the user
module.exports.createSession = function (req, res) {};
