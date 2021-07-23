const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");
const { AuthorizationError } = require("../utils/errors/index");
const db = require("../models/index");
const UserService = require("../services/user.service");
const CartService = require("../services/cart.service");

const cartService = new CartService(
  db.Cart,
  db.CartItem,
  db.Item,
  db.sequelize
);
const userService = new UserService(db.User, bcrypt, jwt);

function isAuthorized(requestUserId, authUserId) {
  // Check if the userId in the jwt token matches request userId
  if (requestUserId !== authUserId) {
    throw new AuthorizationError();
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await userService.hashPassword(password, 10);

    logger.info(`Creating User with Email:${email}`);
    const userId = await userService.createUser(
      email,
      hashedPassword,
      firstName,
      lastName
    );

    const responseData = {
      data: {
        id: userId,
      },
    };
    res.status(StatusCodes.CREATED).json(responseData);
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    logger.info(`Login User with Email:${email}`);

    const jwt = await userService.loginUser(email, password);

    const responseData = {
      data: {
        token: jwt,
      },
    };
    res.json(responseData);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  /**
   * Ideally, we should not handle password updates from this endpoint.
   * Allowing it here for the simplicity of the demo.
   */
  try {
    const userDetails = req.body;
    const requestUserId = req.params.id;
    const authUserId = req.authData.id;

    isAuthorized(requestUserId, authUserId);

    logger.info(`Updating User with id:${authUserId}`);
    // Hash password if given in the req.body
    if (userDetails.password) {
      userDetails.password = await userService.hashPassword(
        userDetails.password,
        10
      );
    }
    await userService.updateUser(requestUserId, userDetails);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const requestUserId = req.params.id;
    const authUserId = req.authData.id;

    isAuthorized(requestUserId, authUserId);

    logger.info(`Getting info for User with id:${authUserId}`);
    const user = await userService.getUser(requestUserId);

    const responseData = {
      data: {
        user: user,
      },
    };
    res.json(responseData);
  } catch (err) {
    next(err);
  }
}

async function listUserCarts(req, res, next) {
  try {
    const requestUserId = req.params.id;
    const authUserId = req.authData.id;

    isAuthorized(requestUserId, authUserId);

    logger.info(`Listing carts for User with id:${authUserId}`);
    const carts = await cartService.listUserCarts(requestUserId);

    const responseData = {
      data: {
        carts: carts,
      },
    };

    res.json(responseData);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  loginUser,
  listUserCarts,
};
