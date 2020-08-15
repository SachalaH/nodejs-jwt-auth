module.exports.getSignup = (req, res) => {
  res.render("signup");
};
module.exports.getLogin = (req, res) => {
  res.render("login");
};
module.exports.postSignup = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("New user signup");
};
module.exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("User login authentication");
};
