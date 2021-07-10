const logger = require("../utils/logger");
const db = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const CartService = require("../services/cart.service");
const cartService = new CartService(db.Cart, db.CartItem, db.Item);

async function createCart(req, res, next) {
  try {
    // getting the user Id from jwt to associate the cart with
    const userId = req.authData.id;

    logger.debug(`Creating cart for userId:${userId}`);
    const cartId = await cartService.create(userId);
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
    logger.debug(`Listing items for cartId:${cartId}`);
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
    const transaction = await db.sequelize.transaction();
    logger.debug(
      `Adding itemId:${itemId} of Quantity:${quantity} to CartId:${cartId}`
    );
    await cartService.addItem(cartId, itemId, quantity, transaction);
    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}

async function deleteItemFromCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    const transaction = await db.sequelize.transaction();
    logger.debug(`Deleting itemId:${itemId} from CartId:${cartId}`);
    await cartService.deleteItem(cartId, itemId, transaction);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

async function editItemInCart(req, res, next) {
  try {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    const quantity = req.body.quantity;
    const transaction = await db.sequelize.transaction();
    logger.debug(
      `Updating itemId:${itemId} of quantity:${quantity} to CartId:${cartId}`
    );
    await cartService.updateItem(cartId, itemId, quantity, transaction);
    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCart,
  addItemToCart,
  deleteItemFromCart,
  editItemInCart,
  listItemsInCart,
};
