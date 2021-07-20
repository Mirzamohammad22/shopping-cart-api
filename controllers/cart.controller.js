const logger = require("../utils/logger");
const db = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const {
  ResourceNotFoundError,
  UnAuthorizedUserError,
} = require("../utils/errors/index");
const CartService = require("../services/cart.service");
const jsonCache = require("../utils/cache");
const constants = require("../utils/constants")
const cartService = new CartService(db.Cart, db.CartItem, db.Item);

async function isCartOwner(cartId, userId) {
  try {
    // get carts from redis cache
    const cacheKey = `userId:${userId}`;
    let userCarts = await jsonCache.get(cacheKey);

    // cache-miss, query db and set cache
    if (!userCarts) {
      const userCartsArray = await cartService.listUserCartIds(userId);
      userCarts = userCartsArray.reduce(
        (acc, cart) => ((acc[cart] = true), acc),
        {}
      );
      await jsonCache.set(cacheKey, userCarts, { expire: constants.DAY_IN_SECONDS });
    }

    // verify cart belongs to user
    if (userCarts[cartId] !== true) {
      throw new UnAuthorizedUserError("FORBIDDEN", StatusCodes.FORBIDDEN);
    }

    return true;
  } catch (err) {
    /**
     * If cart does not exist, we dont want user to know this.
     * They could possibly keep hitting the api to identify which carts exist.
     */
    if (err instanceof ResourceNotFoundError) {
      throw new UnAuthorizedUserError("FORBIDDEN");
    } else {
      throw err;
    }
  }
}

async function createCart(req, res, next) {
  try {
    // Getting the user Id from jwt to associate the cart with
    const userId = req.authData.id;
    const cacheKey = `userId:${userId}`;
    const cacheObject = {};
    logger.info(`Creating cart for userId:${userId}`);
    const cartId = await cartService.createCart(userId);
    // clearing cache
    await jsonCache.del(cacheKey);
    return res.json({
      id: cartId,
    });
  } catch (err) {
    next(err);
  }
}

async function listItemsInCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const userId = req.authData.id;
    await isCartOwner(cartId, userId);
    logger.info(`Listing items for cartId:${cartId}`);
    const itemList = await cartService.listItems(cartId);
    if (!itemList) {
      return res.json({
        message: "Cart is empty!",
      });
    }
    return res.json(itemList);
  } catch (err) {
    next(err);
  }
}

async function addItemToCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    const userId = req.authData.id;
    await isCartOwner(cartId, userId);
    const transaction = await db.sequelize.transaction();
    logger.info(
      `Adding itemId:${itemId} of Quantity:${quantity} to CartId:${cartId}`
    );
    await cartService.addCartItem(cartId, itemId, transaction, quantity);
    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    if(err instanceof ResourceNotFoundError){
      err.statusCode = StatusCodes.BAD_REQUEST
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
    const transaction = await db.sequelize.transaction();
    logger.info(`Deleting itemId:${itemId} from CartId:${cartId}`);
    await cartService.deleteCartItem(cartId, itemId, transaction);
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
    const transaction = await db.sequelize.transaction();
    logger.info(
      `Updating itemId:${itemId} of quantity:${quantity} to CartId:${cartId}`
    );
    await cartService.updateCartItem(cartId, itemId, transaction, quantity);
    return res.sendStatus(StatusCodes.OK);
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
