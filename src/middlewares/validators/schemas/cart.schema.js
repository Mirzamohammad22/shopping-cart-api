const { checkSchema } = require("express-validator");


// TODO: Fix min validators
const isIntErrorMessage = {
  errorMessage: "Value must be an Integer",
};
const minimumQuantityMessage = {
  errorMessage: "Integer value required of minimum 1",
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


// TODO: Fix min validators
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
      options:{
        min:1,
      },
      minimumQuantityMessage,
    },
    toInt:true
  },
});

module.exports = {
  listCartItemSchema,
  addCartItemSchema,
  deleteCartItemSchema,
  updateCartItemSchema,
};
