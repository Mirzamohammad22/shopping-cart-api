module.exports = {
  get: {
    tags: ["User Endpoints"],
    summary: "Get user carts",
    security: [
      {
        BearerAuth: [],
      },
    ],
    description:
      "Get a list of carts of a user based on the id provided. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "getUserCarts",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
    ],
    responses: {
      200: {
        $ref: "#/components/responses/userCarts",
      },
      401: {
        $ref: "#/components/responses/401",
      },
      403: {
        $ref: "#/components/responses/403",
      },
      404: {
        $ref: "#/components/responses/404",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
