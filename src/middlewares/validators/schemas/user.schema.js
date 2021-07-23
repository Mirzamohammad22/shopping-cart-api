const { checkSchema } = require("express-validator");
const { INPUT_VALIDATOR_ERROR_MESSAGES } = require("../../../utils/constants");

const passwordLengthOptions = {
  errorMessage: "Password must be atleast 8 characters",
  options: { min: 8 },
};

const isEmailOptions = {
  errorMessage: "Valid email required",
};

const existsOptions = {
  errorMessage: INPUT_VALIDATOR_ERROR_MESSAGES.validValue,
  options: { checkFalsy: true },
};

const isStringOptions = {
  errorMessage: INPUT_VALIDATOR_ERROR_MESSAGES.isString,
};

const createUserSchema = checkSchema({
  email: {
    in: "body",
    optional: false,
    isEmail: isEmailOptions,
    normalizeEmail: true,
    trim: true,
  },
  firstName: {
    in: "body",
    optional: false,
    isString: isStringOptions,
    exists: existsOptions,
    trim: true,
  },
  lastName: {
    in: "body",
    optional: true,
    isString: isStringOptions,
    exists: existsOptions,
    trim: true,
  },
  password: {
    in: "body",
    optional: false,
    isLength: passwordLengthOptions,
    isString: isStringOptions,
    exists: existsOptions,
  },
});

const updateUserSchema = checkSchema({
  email: {
    in: "body",
    optional: true,
    isEmail: isEmailOptions,
    normalizeEmail: true,
    trim: true,
  },
  firstName: {
    in: "body",
    optional: true,
    isString: isStringOptions,
    exists: existsOptions,
    trim: true,
  },
  lastName: {
    in: "body",
    optional: true,
    isString: isStringOptions,
    exists: existsOptions,
    trim: true,
  },
  password: {
    in: "body",
    optional: true,
    isLength: passwordLengthOptions,
    isString: isStringOptions,
    exists: existsOptions,
  },
});

const loginSchema = checkSchema({
  email: {
    in: "body",
    optional: false,
    isEmail: isEmailOptions,
    exists: existsOptions,
    normalizeEmail: true,
    trim: true,
  },
  password: {
    in: "body",
    optional: false,
    exists: existsOptions,
    isString: isStringOptions,
  },
});

module.exports = { createUserSchema, updateUserSchema, loginSchema };
