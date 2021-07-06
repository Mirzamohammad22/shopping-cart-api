const UserService = require("../services/user.service");
const logger = require("../utils/logger");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const userModel = db.User;

const userService = new UserService(userModel, bcrypt);

async function createUser(req, res, next) {
  try {
    const userDetails = { ...req.body };
    userDetails.password = await userService.hashPassword(
      userDetails.password,
      10
    );
    const createdUser = await userService.createUser(userDetails);
    if (!createdUser) {
      const userExistsError = new Error("Email already registered");
      userExistsError.statusCode = 400;
      throw userExistsError;
    }
    res.status(201).json({ id: createdUser });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userDetails = { ...req.body };
    const userId = req.params.id;

    /**
     * Ideally we should not handle password updates from this endpoint.
     * But for simplicity it is included.
     */

    //hash password if given in the req.body
    if (userDetails.password) {
      userDetails.password = await userService.hashPassword(
        userDetails.password,
        10
      );
    }
    const userUpdated = await userService.updateUser(userId, userDetails);
    if (!userUpdated) {
      const userNotFoundError = new Error("No User Found to be updated");
      userNotFoundError.statusCode = 404;
      throw userNotFoundError;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const filter = {
      id: req.params.id,
    };
    const user = await userService.getUser(filter);
    if (!user) {
      const userNotFoundError = new Error("User Not Found");
      userNotFoundError.statusCode = 404;
      throw userNotFoundError;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
};
