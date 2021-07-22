const carts = require("./carts");
const items = require("./items");
const users = require("./users");

module.exports = {
  paths: {
    ...carts,
    ...items,
    ...users,
  },
};
