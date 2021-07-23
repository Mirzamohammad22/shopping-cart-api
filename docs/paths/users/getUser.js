module.exports = {
  get: {
    tags: ["User Endpoints"],
    summary: "Get user details",
    security: [
      {
        BearerAuth: [],
      },
    ],
    description:
      "Get the details of a user based on the id provided. This endpoint requires the requested user's Auth token.",
    operationId: "getUser",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
    ],
    responses: {
      200: {
        description: "***OK*** - Returns the details of the user.",
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
                      description: "ID of the user",
                      example: 123,
                    },
                    firstName: {
                      type: "string",
                      description: "User's first name",
                      example: "John",
                    },
                    lastName: {
                      type: "string",
                      description: "User's last name",
                      example: "Doe",
                    },
                    email: {
                      type: "email",
                      description: "User's email address",
                      example: "john.doe@gmail.com",
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
