const { checkSchema } = require("express-validator");

const urlIdSchema = checkSchema({
  id: {
    in: "params",
    isInt: true,
    toInt: true,
  },
});

const paginationSchema = checkSchema({
  page: {
    in: ["query"],
    optional: true,
    isInt: {
      options: {
        min: 1,
      },
    },
    toInt: true,
  },
  size: {
    in: ["query"],
    optional: true,
    isInt: {
      options: {
        min: 1,
      },
    },
    toInt: true,
  },
});

module.exports = { urlIdSchema, paginationSchema };
