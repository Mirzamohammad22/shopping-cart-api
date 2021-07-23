const { checkSchema } = require("express-validator");
const {INPUT_VALIDATOR_ERROR_MESSAGES} = require("../../../utils/constants")

const isIntOptions = {
  errorMessage: INPUT_VALIDATOR_ERROR_MESSAGES.isInt,
};

const minimumQuantityOptions = {
  errorMessage: "Integer value required (Minimum value: 1)",
  options: {
    min: 1,
  }
};

const listCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
});

const addCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
  itemId: {
    in: ["body"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
  quantity: {
    in: ["body"],
    optional: true,
    isInt: minimumQuantityOptions,
    toInt: true,
  },
});


const deleteCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
  itemId: {
    in: ["params"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
});

const updateCartItemSchema = checkSchema({
  cartId: {
    in: ["params"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
  itemId: {
    in: ["params"],
    optional: false,
    isInt: isIntOptions,
    toInt: true,
  },
  quantity: {
    in: ["body"],
    optional: false,
    isInt: minimumQuantityOptions,
    toInt: true,
  },
});

module.exports = {
  listCartItemSchema,
  addCartItemSchema,
  deleteCartItemSchema,
  updateCartItemSchema,
};
