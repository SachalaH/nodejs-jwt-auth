const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Minimum length of password is 6"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
