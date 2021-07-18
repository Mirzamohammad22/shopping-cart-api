const createResolvedValue = {
  id: 16,
  userId: 3,
  updatedAt: "2021-07-18T16:08:16.000Z",
  createdAt: "2021-07-18T12:21:20.000Z",
};

const findAllResolvedValueCart = [
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
const listUserCartsData = [
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
const findAllResolvedValueCartItem = [
  {
    dataValues: { itemId: 1, quantity: 2000, Item: {
        name:'apple'
    } },
  },
  {
    dataValues: { itemId: 3, quantity: 200, Item: {
        name:'mango'
    } },
  },
];
const listItemData = [
    {
        id: 1,
        quantity: 2000,
        name:'apple'

    },
    {
        id: 3,
        quantity: 200,
        name:'mango'

    }
]
const listUserCartIdsData = [11, 12, 13, 14, 15];


const findByPkItemResolvedValueItem =  {
    id: 4,
    name: 'Macbook',
    category: 'laptops',
    stock: 348,
    price: 9000,
    sku: 42345348,
    createdAt: "2021-07-14T16:08:16.000Z",
    updatedAt: "2021-07-18T20:07:01.000Z"
}
const findOrCreateResolvedValueCreated = [
    {
        quantity: 100,
        cartId: 11,
        itemId: 4,
        updatedAt: "2021-07-18T21:09:00.812Z",
        createdAt: "2021-07-18T21:09:00.812Z"
    },
    true

]

module.exports = {
  createResolvedValue,
  findAllResolvedValueCart,
  listUserCartsData,
  listUserCartIdsData,
  findAllResolvedValueCartItem,
  listItemData,
  findByPkResolvedValueItem,
  findOrCreateResolvedValueCreated,
};