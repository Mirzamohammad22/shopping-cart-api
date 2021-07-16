const UserService = require("../services/user.service");
const logger = require("../utils/logger");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const jsonCache = require("../utils/cache");
const { UnAuthorizedUserError } = require("../utils/errors/index");
const constants = require("../utils/constants");
const CartService = require("../services/cart.service");

const cartService = new CartService(db.Cart, db.CartItem, db.Item);
const userService = new UserService(db.User, bcrypt, jwt);

function isAuthorized(requestUserId, authUserId) {
  // check if the userId in jwt matches req user
  if (requestUserId !== authUserId) {
    throw new UnAuthorizedUserError("FORBIDDEN", StatusCodes.FORBIDDEN);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await userService.hashPassword(password, 10);
    const userId = await userService.createUser(
      email,
      hashedPassword,
      firstName,
      lastName
    );
    res.status(201).json({ id: userId });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userDetails = req.body;
    const requestUserId = req.params.id;
    const authUserId = req.authData.id;

    isAuthorized(requestUserId, authUserId);

    /**
     * Ideally we should not handle password updates from this endpoint.
     * But for simplicity it is included.
     */

    // hash password if given in the req.body
    if (userDetails.password) {
      userDetails.password = await userService.hashPassword(
        userDetails.password,
        10
      );
    }
    await userService.updateUser(userId, userDetails);

    // delete cache for GET requests
    await jsonCache.del(req.originalUrl);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const requestUserId = req.params.id;
    const authUserId = req.authData.id;
    isAuthorized(requestUserId, authUserId);

    const user = await userService.getUser(requestUserId);

    await jsonCache.set(req.originalUrl, user, {
      expire: constants.DAY_IN_SECONDS,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const jwt = await userService.loginUser(email, password);
    res.json({
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
}
async function listUserCarts(req, res, next) {
  try {
    const requestUserId = req.params.id;
    const authUserId = req.authData.id;
    isAuthorized(requestUserId, authUserId);
    const carts = await cartService.listUserCarts(requestUserId);
    res.json({ carts });
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
