const express = require("express");
const { authenticate } = require("../auth/tools");

const UserModel = require("./schema");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();

    res.send(_id);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findByCredentials(username, password);
    console.log(user);
    const tokens = await authenticate(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
