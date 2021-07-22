module.exports = {
  post: {
    tags: ["User Endpoints"],
    summary: "Login user",
    description:
      "Get auth token for user by logging in using the details provided in the request body.",
    operationId: "loginUser",
    requestBody: {
      description: "Details required for login",
      required: true,
      content: {
        "application/json": {
          examples: {
            userLoginDetails: {
              $ref: "#/components/examples/userLoginDetails",
            },
          },
          schema: {
            $ref: "#/components/schemas/UserLoginInput",
          },
        },
      },
    },
    responses: {
      200: {
        description:
          "***OK*** - Returns the auth token for the user valid for 24 hours that can be used to authenticate the user with the API.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "JWT auth token for the user",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImlhdCI6MTYyNjg4NjIxNiwiZXhwIjoxNjI2OTcyNjE2fQ.ajNJOEsIbL6Sl-e09hLJDgdutv7e1xduGHW8D7p1pew",
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
      401: {
        $ref: "#/components/responses/invalidCredentials",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
