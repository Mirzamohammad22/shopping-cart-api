const UserService = require("../services/user.service");
const logger = require("../utils/logger");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const userModel = db.User;

const userService = new UserService(userModel, bcrypt, jwt);

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
      userExistsError.statusCode = StatusCodes.BAD_REQUEST;
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
      userNotFoundError.statusCode = StatusCodes.NOT_FOUND;
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
      userNotFoundError.statusCode = StatusCodes.NOT_FOUND;
      throw userNotFoundError;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const jwt = await userService.loginUser(email, password);
    if (!jwt) {
      const invalidCredentialsError = new Error("Invalid Credentials");
      invalidCredentialsError.statusCode = StatusCodes.BAD_REQUEST;
      throw invalidCredentialsError
    }
    res.json({
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  loginUser,
};
