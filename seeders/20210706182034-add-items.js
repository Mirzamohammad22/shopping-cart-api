"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Doritos",
          sku: 12345678,
          category: "chips",
          price: 2,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pepsi",
          sku: 12345679,
          category: "beverages",
          price: 5,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mango",
          sku: 12545610,
          category: "fruits",
          price: 2,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Macbook",
          sku: 42345348,
          category: "laptops",
          price: 9000,
          stock: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Playstation 5",
          sku: 32345238,
          category: "consoles",
          price: 5000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
