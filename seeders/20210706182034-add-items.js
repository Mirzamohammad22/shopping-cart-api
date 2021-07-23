"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Playstation 5",
          sku: 12345678,
          category: "consoles",
          price: 2000,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xbox series x",
          sku: 12345679,
          category: "consoles",
          price: 1500,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nintendo Switch",
          sku: 32340838,
          category: "consoles",
          price: 5000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Macbook pro",
          sku: 12545610,
          category: "laptops",
          price: 20000,
          stock: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell xps",
          sku: 42345348,
          category: "laptops",
          price: 9000,
          stock: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo Yoga",
          sku: 12345238,
          category: "laptops",
          price: 5000,
          stock: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Iphone X",
          sku: 32345238,
          category: "phones",
          price: 7000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "One Plus 8T",
          sku: 32293238,
          category: "phones",
          price: 5000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung s21",
          sku: 10345238,
          category: "phones",
          price: 3000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Google Pixel 5",
          sku: 32341328,
          category: "phones",
          price: 2000,
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
