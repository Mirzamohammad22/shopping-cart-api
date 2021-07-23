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
      "Get a list of carts of a user based on the id provided. This endpoint requires the requested user's Auth token.",
    operationId: "getUserCarts",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
    ],
    responses: {
      200: {
        description:
          "***OK*** - Returns a list of carts that belong to the user.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    carts: {
                      description: "List of user carts",
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/cart",
                      },
                    },
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
      404: {
        $ref: "#/components/responses/404",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
