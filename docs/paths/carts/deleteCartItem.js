module.exports = {
  delete: {
    tags: ["Cart Endpoints"],
    summary: "Delete item from cart",
    security: [
      {
        BearerAuth: [],
      },
    ],
    description:
      "Delete specified item from the specified cart. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "deleteCartItem",
    parameters: [
      {
        $ref: "#/components/parameters/cartId",
      },
      {
        $ref: "#/components/parameters/itemId",
      },
    ],
    responses: {
      204: {
        description: "***No Content*** - Item deleted from cart successfully.",
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
