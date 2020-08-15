const { Router } = require("express");

const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
