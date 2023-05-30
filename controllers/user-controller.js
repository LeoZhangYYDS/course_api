const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/user-model");

module.exports = {
  async registerUser(req, res) {
    let error = validateUser(req.body);
    if (error.error)
      return res.status(400).send(error.error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already in use");
    user = new User(
      _.pick(req.body, ["username", "email", "password", "role"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    let newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });

    await newUser.save();

    const token = newUser.generateAuthToken();
    res.header("x-auth-token", token);
    let userData = _.pick(user, ["_id", "username", "email", "role"]);
    userData.token = token;
    res.send(userData);
  },

  async getUserByTokenId(req, res) {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  },
};
