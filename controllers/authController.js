const User = require("../models/User");

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
    res.status(400).send("Error, user creation failed.");
  }
};
module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("User login authentication");
};
