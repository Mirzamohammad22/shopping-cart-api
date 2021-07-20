const { checkSchema } = require("express-validator");

const listSchema = checkSchema({
  category: {
    in: ["query"],
    optional: true,
  },
});

module.exports = { listSchema };
