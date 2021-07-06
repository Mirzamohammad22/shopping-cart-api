"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("carts_items", {
      cartId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      itemId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("carts_items");
  },
};
