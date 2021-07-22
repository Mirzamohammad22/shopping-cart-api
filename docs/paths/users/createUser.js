module.exports = {
  post: {
    tags: ["User Endpoints"],
    summary: "Create a user",
    description:
      "Create a user using the details provided in the request body.",
    operationId: "createUser",
    requestBody: {
      description: "Details of the user to be created",
      required: true,
      content: {
        "application/json": {
          examples: {
            userDetails: {
              $ref: "#/components/examples/userDetails",
            },
            userDetailsWithoutLastName: {
              $ref: "#/components/examples/userDetailsWithoutLastName",
            },
          },
          schema: {
            $ref: "#/components/schemas/userCreateInput",
          },
        },
      },
    },
    responses: {
      201: {
        description: "***Created*** - Returns the id of the user created.",
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
                      description: "Id of the user created",
                      example: 123,
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        $ref: "#/components/responses/400",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
