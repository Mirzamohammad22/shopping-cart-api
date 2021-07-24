const { StatusCodes } = require("http-status-codes");
const {
  ResourceNotFoundError,
  AuthorizationError,
} = require("../utils/errors/index");
const logger = require("../utils/logger");
const jsonCache = require("../utils/cache");
const constants = require("../utils/constants");
const db = require("../models/index");
const CartService = require("../services/cart.service");

const cartService = new CartService(
  db.Cart,
  db.CartItem,
  db.Item,
  db.sequelize
);

async function isCartOwner(cartId, userId) {
  try {
    // Try to get user carts from cache
    const cacheKey = `userId:${userId}`;
    let userCarts = await jsonCache.get(cacheKey);
    // cache-miss, query db and set cache
    if (!userCarts) {
      const userCartsArray = await cartService.listUserCartIds(userId);
      userCarts = userCartsArray.reduce(
        (acc, cart) => ((acc[cart] = true), acc),
        {}
      );
      await jsonCache.set(cacheKey, userCarts, {
        expire: constants.DAY_IN_SECONDS,
      });
    }

    // Verify cart belongs to user
    if (userCarts[cartId] !== true) {
      throw new AuthorizationError();
    }
    return true;
  } catch (err) {
    /**
     * If cart does not exist, we dont want user to know this.
     * They could possibly keep hitting the api to identify which carts exist.
     */
    if (err instanceof ResourceNotFoundError) {
      throw new AuthorizationError();
    } else {
      throw err;
    }
  }
}

async function createCart(req, res, next) {
  try {
    // Getting the userId from jwt to associate the cart with
    const userId = req.authData.id;

    const cacheKey = `userId:${userId}`;

    logger.info(`Creating cart for userId: ${userId}`);
    const cartId = await cartService.createCart(userId);

    // Clearing cache
    await jsonCache.del(cacheKey);

    const responseData = {
      data: {
        id: cartId,
      },
    };
    return res.json(responseData);
  } catch (err) {
    next(err);
  }
}

async function listItemsInCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const userId = req.authData.id;

    await isCartOwner(cartId, userId);

    logger.info(`Listing items for cartId: ${cartId}`);
    const itemList = await cartService.listCartItems(cartId);
    if (itemList) {
      responseData = {
        data: itemList,
      };
    } else {
      responseData = {
        message: "Cart is empty!",
      };
    }
    return res.json(responseData);
  } catch (err) {
    next(err);
  }
}

async function addItemToCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const userId = req.authData.id;
    const { quantity, itemId } = req.body;
    await isCartOwner(cartId, userId);
    logger.info(
      `Adding itemId: ${itemId}, quantity: ${quantity} to cartId: ${cartId}`
    );
    await cartService.addCartItem(cartId, itemId, quantity);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      err.statusCode = StatusCodes.BAD_REQUEST;
    }
    next(err);
  }
}

async function deleteItemFromCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    const userId = req.authData.id;
    await isCartOwner(cartId, userId);
    logger.info(`Deleting itemId: ${itemId} from cartId: ${cartId}`);
    await cartService.deleteCartItem(cartId, itemId);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

async function updateItemInCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    const quantity = req.body.quantity;
    const userId = req.authData.id;

    await isCartOwner(cartId, userId);

    logger.info(
      `Updating itemId: ${itemId}, quantity: ${quantity} in cartId: ${cartId}`
    );
    await cartService.updateCartItem(cartId, itemId, quantity);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCart,
  addItemToCart,
  deleteItemFromCart,
  updateItemInCart,
  listItemsInCart,
};
