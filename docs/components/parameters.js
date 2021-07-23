module.exports = {
  parameters: {
    pageParam: {
      in: "query",
      name: "page",
      required: false,
      schema: {
        type: "integer",
        minimum: 1,
        default: 1,
      },
      description:
        "The page number to fetch the results from a list with pagination",
    },
    sizeParam: {
      in: "query",
      name: "size",
      required: false,
      schema: {
        type: "integer",
        minimum: 1,
        default: 5,
      },
      description: "The numbers of items to return per page",
    },
    userId: {
      name: "userId",
      in: "path",
      schema: {
        type: "integer",
      },
      required: true,
      description: "A single user id",
    },
    cartId: {
      name: "cartId",
      in: "path",
      schema: {
        type: "integer",
      },
      required: true,
      description: "A single cart id",
    },
    itemId: {
      name: "itemId",
      in: "path",
      schema: {
        type: "integer",
      },
      required: true,
      description: "A single item id",
    },
  },
};
