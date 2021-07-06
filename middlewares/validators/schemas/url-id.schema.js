const { checkSchema } = require("express-validator");

const urlIdSchema = checkSchema({
  id: {
    in: "params",
    isInt: true
  }
});
module.exports = urlIdSchema;