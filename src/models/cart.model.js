"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Cart.belongsToMany(models.Item, {
        through: models.CartItem,
        foreignKey: "cartId",
      });
    }
  }
  Cart.init(
    {},
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
