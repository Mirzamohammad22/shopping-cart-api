const createCart = {
  id: 16,
  userId: 3,
  updatedAt: "2021-07-18T16:08:16.000Z",
  createdAt: "2021-07-18T12:21:20.000Z",
};

const findAllCart = [
  {
    id: 11,
    createdAt: "2021-07-09T12:21:20.000Z",
    updatedAt: "2021-07-09T12:21:20.000Z",
  },
  {
    id: 12,
    createdAt: "2021-07-14T16:08:16.000Z",
    updatedAt: "2021-07-14T16:08:16.000Z",
  },
  {
    id: 13,
    createdAt: "2021-07-14T17:07:25.000Z",
    updatedAt: "2021-07-14T17:07:25.000Z",
  },
  {
    id: 14,
    createdAt: "2021-07-18T06:00:08.000Z",
    updatedAt: "2021-07-18T06:00:08.000Z",
  },
  {
    id: 15,
    createdAt: "2021-07-18T10:37:05.000Z",
    updatedAt: "2021-07-18T10:37:05.000Z",
  },
];

const listUserCarts = [
  {
    dataValues: {
      id: 11,
      createdAt: "2021-07-09T12:21:20.000Z",
      updatedAt: "2021-07-09T12:21:20.000Z",
    },
  },
  {
    dataValues: {
      id: 12,
      createdAt: "2021-07-14T16:08:16.000Z",
      updatedAt: "2021-07-14T16:08:16.000Z",
    },
  },
  {
    dataValues: {
      id: 13,
      createdAt: "2021-07-14T17:07:25.000Z",
      updatedAt: "2021-07-14T17:07:25.000Z",
    },
  },
  {
    dataValues: {
      id: 14,
      createdAt: "2021-07-18T06:00:08.000Z",
      updatedAt: "2021-07-18T06:00:08.000Z",
    },
  },
  {
    dataValues: {
      id: 15,
      createdAt: "2021-07-18T10:37:05.000Z",
      updatedAt: "2021-07-18T10:37:05.000Z",
    },
  },
];

const findAllCartItem = [
  {
    dataValues: {
      itemId: 1,
      quantity: 2000,
      Item: {
        name: "apple",
        price: 100,
      },
    },
  },
  {
    dataValues: {
      itemId: 3,
      quantity: 200,
      Item: {
        name: "mango",
        price: 100,
      },
    },
  },
];

const listCartItem = [
  {
    id: 1,
    quantity: 2000,
    name: "apple",
    price: 100,
  },
  {
    id: 3,
    quantity: 200,
    name: "mango",
    price: 100,
  },
];
const listUserCartIds = [11, 12, 13, 14, 15];

const findByPkItem = {
  id: 4,
  name: "Macbook",
  category: "laptops",
  stock: 3480,
  price: 9000,
  sku: 42345348,
  createdAt: "2021-07-14T16:08:16.000Z",
  updatedAt: "2021-07-18T20:07:01.000Z",
};

const findOrCreateCartItemCeated = [
  {
    quantity: 100,
    cartId: 11,
    itemId: 4,
    updatedAt: "2021-07-18T21:09:00.812Z",
    createdAt: "2021-07-18T21:09:00.812Z",
  },
  true,
];

const findOrCreateCartItemFound = [
  {
    quantity: 100,
    cartId: 11,
    itemId: 4,
    updatedAt: "2021-07-18T21:09:00.812Z",
    createdAt: "2021-07-18T21:09:00.812Z",
  },
  false,
];

const findOneCartItem = {
  quantity: 500,
  cartId: 11,
  itemId: 4,
  createdAt: "2021-07-19T08:20:45.000Z",
  updatedAt: "2021-07-19T08:20:45.000Z",
};

const updateCartItem = {
  quantity: 200,
  cartId: 11,
  itemId: 4,
  createdAt: "2021-07-19T08:20:45.000Z",
  updatedAt: "2021-07-19T08:20:45.000Z",
};

module.exports = {
  createCart,
  findAllCart,
  listUserCarts,
  listUserCartIds,
  findAllCartItem,
  listCartItem,
  findByPkItem,
  findOrCreateCartItemCeated,
  findOrCreateCartItemFound,
  findOneCartItem,
  updateCartItem,
};
