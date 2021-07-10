const { checkSchema } = require("express-validator");


const isIntErrorMessage = {
    errorMessage:"Value must be an Integer"
}

const listCartItemSchema = checkSchema({
    cartId: {
      in: ["params"],
      optional: false,
      isInt:isIntErrorMessage
    },
});

const addCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt:isIntErrorMessage
  },
  itemId: {
    in: ["body"],
    optional: false,
    isInt:isIntErrorMessage,
  },
  quantity: {
    in: ["body"],
    optional: true,
    isInt:isIntErrorMessage,
  },
});

const deleteCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt:isIntErrorMessage,
  },
  itemId: {
    in: ["params"],
    optional: false,
    isInt:isIntErrorMessage,
  },
});

const updateCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt:isIntErrorMessage,
  },
  itemId: {
    in: ["params"],
    optional: false,
    isInt:isIntErrorMessage,
  },
  quantity: {
    in: ["body"],
    optional: false,
    isInt:isIntErrorMessage,
  },
});

module.exports = {
  listCartItemSchema,
  addCartItemSchema,
  deleteCartItemSchema,
  updateCartItemSchema,
};
