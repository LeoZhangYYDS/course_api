const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher"],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
    },
    process.env.COURSE_KEY
  );
  return token;
};

//Model
const User = mongoose.model("User", userSchema);

//JOI Validation
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    role: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
