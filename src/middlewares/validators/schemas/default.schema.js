const { checkSchema } = require("express-validator");

const minimumIntValueOptions = {
  options: {
    min: 1,
  },
}

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
    isInt: minimumIntValueOptions,
    toInt: true,
  },
  size: {
    in: ["query"],
    optional: true,
    isInt: minimumIntValueOptions,
    toInt: true,
  },
});

module.exports = { urlIdSchema, paginationSchema };
