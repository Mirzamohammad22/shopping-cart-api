const createCart = require("./createCart");
const createCartItem = require("./createCartItem");
const updateCartItem = require("./updateCartItem");
const deleteCartItem = require("./deleteCartItem");
const getCartItems = require("./getCartItems");

module.exports = {
  "/carts/": {
    ...createCart,
  },
  "/carts/{cartId}/items/": {
    ...createCartItem,
    ...getCartItems,
  },
  "/carts/{cartId}/items/{itemId}/": {
    ...updateCartItem,
    ...deleteCartItem,
  }
};
