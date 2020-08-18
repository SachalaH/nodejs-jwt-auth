const User = require("../models/User");

// Error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
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
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("User login authentication");
};
