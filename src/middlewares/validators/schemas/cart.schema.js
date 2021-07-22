const { checkSchema } = require("express-validator");


const isIntErrorMessage = {
  errorMessage: "Value must be an integer",
};
const minimumQuantityMessage = {
  errorMessage: "Integer required with a minimum value of 1",
};

const listCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
});

const addCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
  itemId: {
    in: ["body"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
  quantity: {
    in: ["body"],
    optional: true,
    isInt: {
      min: 1,
      minimumQuantityMessage,
    },
    toInt: true,
  },
});


const deleteCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
  itemId: {
    in: ["params"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
});

const updateCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
  itemId: {
    in: ["params"],
    optional: false,
    isInt: isIntErrorMessage,
    toInt: true,
  },
  quantity: {
    in: ["body"],
    optional: false,
    isInt: {
      options: {
        min: 1,
      },
      minimumQuantityMessage,
    },
    toInt: true,
  },
});

module.exports = {
  listCartItemSchema,
  addCartItemSchema,
  deleteCartItemSchema,
  updateCartItemSchema,
};
