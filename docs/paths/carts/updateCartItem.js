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
      "Update item in the specified cart using the details provided in the request body. This endpoint can only be accessed by the user himself using the auth token for authorization.",
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
      200: {
        description: "***OK*** - Item updated in cart successfully.",
        content: {
          "plain/text": {
            schema: {
              type: "string",
              example: "OK",
            },
          },
        },
      },
      400: {
        $ref: "#/components/responses/invalidCartItemInput",
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
