const getItems = require("./getItems");

module.exports = {
  "/items/": {
    ...getItems,
  },
};
