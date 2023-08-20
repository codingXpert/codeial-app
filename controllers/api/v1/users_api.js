const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.status(422).json({ message: "Invalid userName/password" });
    }

    const token = jwt.sign(user.toJSON(), "codeial", { expiresIn: "1d" });

    return res.status(200).json({
      message: "Sign in successful. Here is your token. Please keep it safe!",
      data: {
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};