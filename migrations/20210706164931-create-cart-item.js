"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CartItems", {
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Carts",
          key: "id",
        },
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Items",
          key: "id",
        },
      },
      quantity: {
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
    await queryInterface.addConstraint("CartItems", {
      fields: ["itemId", "cartId"],
      type: "primary key",
      name: "cartitem_pkey",
    });
    await queryInterface.addConstraint("CartItems", {
      fields: ["quantity"],
      type: "check",
      where: {
        quantity: {
          [Sequelize.Op.gte]: 1,
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CartItems");
  },
};
