module.exports = {
  patch: {
    tags: ["Cart Endpoints"],
    summary: "Update item in cart",
    security: [
      {
        BearerAuth: [],
      },
    ],
    description:
      "Update item in the specified cart using the details provided in the request body. This endpoint can only be accessed by the cart owner using the Auth token.",
    operationId: "updateCartItem",
    parameters: [
      {
        $ref: "#/components/parameters/cartId",
      },
      {
        $ref: "#/components/parameters/itemId",
      },
    ],
    requestBody: {
      description: "Details of the item to be updated in the cart",
      required: true,
      content: {
        "application/json": {
          examples: {
            updateCartItemDetails: {
              $ref: "#/components/examples/updateCartItemDetails",
            },
          },
          schema: {
            $ref: "#/components/schemas/updateCartItemInput",
          },
        },
      },
    },
    responses: {
      204: {
        description: "***No Content*** - Updated cart successfully.",
      },
      400: {
        $ref: "#/components/responses/400",
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
