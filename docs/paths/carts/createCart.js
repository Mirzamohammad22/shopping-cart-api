module.exports = {
  post: {
    tags: ["Cart Endpoints"],
    security: [
      {
        BearerAuth: [],
      },
    ],
    summary: "Create a cart",
    description:
      "Create a cart for a user using data in Auth token. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "createCart",
    responses: {
      200: {
        description: "***OK*** - Returns the id of the cart created.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "Id of the cart created",
                      example: 123,
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
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
