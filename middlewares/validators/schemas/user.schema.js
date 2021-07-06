const { checkSchema } = require("express-validator");

const createUserSchema = checkSchema({
  email: {
    in: "body",
    isEmail: {
      errorMessage: "Valid email required",
    },
    normalizeEmail: true,
    trim: true,
    toLowerCase: true,
  },
  firstName: {
    in: "body",
    optional: false,
    exists: {
      errorMessage: "Valid firstname required",
      options: { checkFalsy: true },
    },
    trim: true,
  },
  lastName: {
    in: "body",
    optional: true,
    exists: {
      errorMessage: "Valid lastname required",
      options: { checkFalsy: true },
    },
    trim: true,
  },
  password: {
    optional: false,
    in: "body",
    isLength: {
      errorMessage: "Password must be atleast 8 characters",
      options: { min: 8 },
    },
    exists: {
      checkFalsy: true,
    },
    trim: true,
  },
});

const updateUserSchema = checkSchema({
  email: {
    in: "body",
    optional: true,
    isEmail: {
      errorMessage: "Valid email required",
    },
    normalizeEmail: true,
    trim: true,
    toLowerCase: true,
  },
  firstName: {
    in: "body",
    optional: true,
    exists: {
      errorMessage: "Valid firstname required",
      options: { checkFalsy: true },
    },
    trim: true,
  },
  lastName: {
    in: "body",
    optional: true,
    exists: {
      errorMessage: "Valid lastname required",
      options: { checkFalsy: true },
    },
    trim: true,
  },
  password: {
    optional: true,
    in: "body",
    isLength: {
      errorMessage: "Password must be atleast 8 characters",
      options: { min: 8 },
    },
    exists: {
      checkFalsy: true,
    },
    trim: true,
  },
});

module.exports = { createUserSchema, updateUserSchema };
