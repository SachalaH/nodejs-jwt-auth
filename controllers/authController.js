const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  // Incorrect email
  if (err.message === "Incorrect Email.") {
    errors.email = "That E-Mail is not registered";
  }
  // Incorrect password
  if (err.message === "Incorrect Password.") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
// Creating a json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Harsh 1421 @#$", { expiresIn: maxAge });
};

module.exports.getSignup = (req, res) => {
  res.render("signup");
};
module.exports.getLogin = (req, res) => {
  res.render("login");
};
module.exports.postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
