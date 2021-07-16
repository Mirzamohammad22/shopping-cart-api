const { checkSchema } = require("express-validator");

const urlIdSchema = checkSchema({
  id: {
    in: "params",
    isInt: true,
    toInt:true,
  }
});
module.exports = urlIdSchema;