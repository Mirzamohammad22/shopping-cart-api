module.exports = {
  get: {
    tags: ["Cart Endpoints"],
    summary: "Get all cart items",
    security: [
      {
        BearerAuth: [],
      },
    ],
    description:
      "Get a list of all items in the specified cart. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "getCartItems",
    parameters: [
      {
        $ref: "#/components/parameters/cartId",
      },
    ],
    responses: {
      200: {
        description: "***OK*** - Returns a list of items in the cart",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  description: "List of the items in the cart",
                  items: {
                    $ref: "#/components/schemas/CartItem",
                  },
                },
              },
            },
          },
        },
      },
      401: {
        $ref: "#/components/responses/401",
      },
      403: {
        $ref: "#/components/responses/403",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
