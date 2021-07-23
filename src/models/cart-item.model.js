"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cartId",
      });
      CartItem.belongsTo(models.Item, {
        foreignKey: "itemId",
      });
    }
  }
  CartItem.init(
    {
      quantity: DataTypes.INTEGER,
      cartId: {
        type: DataTypes.INTEGER,
      },
      itemId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
