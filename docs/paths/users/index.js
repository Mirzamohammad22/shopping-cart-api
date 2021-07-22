const createUser = require("./createUser");
const loginUser = require("./loginUser");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const getUserCarts = require("./getUserCarts");

module.exports = {
  "/users/": {
    ...createUser,
  },
  "/users/login": {
    ...loginUser,
  },
  "/users/{userId}": {
    ...getUser,
    ...updateUser,
  },
  "/users/{userId}/carts": {
    ...getUserCarts,
  },
};
