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

// function to be fired after a doc is saved in the db
userSchema.post("save", function (doc, next) {
  console.log("User is created and saved in the database.", doc);
  next();
});
// function to be fired before a doc is saved in the db
userSchema.pre("save", function (next) {
  console.log("New user is about to be created and saved.", this);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
