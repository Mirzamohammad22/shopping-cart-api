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
    if (createdUser) {
      res.status(201).json({id:createdUser});
    } else {
      const userExistsError = new Error("Email already registered");
      userExistsError.statusCode = 400;
      throw userExistsError;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
};
