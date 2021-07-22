const findAndCountAllItem = {
  count: 1,
  rows: [
    {
      dataValues: {
        id: 1,
        name: "Doritos",
        category: "chips",
        stock: "2000000000",
        price: 2,
        sku: 12345678,
      },
    },
  ],
};

const listItemsData = {
  count: 1,
  rows: [
    {
      id: 1,
      name: "Doritos",
      category: "chips",
      stock: "2000000000",
      price: 2,
      sku: 12345678,
    },
  ],
};

const findAndCountAllItemEmptyMatch = {
  count: 0,
  rows: [],
};

module.exports = {
  findAndCountAllItem,
  listItemsData,
  findAndCountAllItemEmptyMatch,
};
