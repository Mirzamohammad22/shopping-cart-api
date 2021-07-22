module.exports = {
  post: {
    tags: ["Cart Endpoints"],
    summary: "Add item to cart",
    security: [
        {
          BearerAuth: [],
        },
      ],
    description:
      "Add item to the specified cart using the details provided in the request body. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "createCartItem",
    parameters: [
        {
          $ref: "#/components/parameters/cartId",
        },
      ],
    requestBody: {
      description: "Details of the item to be added to the cart",
      required: true,
      content: {
        "application/json": {
          examples: {
            cartItemDetails: {
              $ref: "#/components/examples/cartItemDetails",
            },
          },
          schema: {
            $ref: "#/components/schemas/cartItemInput",
          },
        },
      },
    },
    responses: {
      200: {
        description: "***OK*** - Item added to cart successfully.",
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
