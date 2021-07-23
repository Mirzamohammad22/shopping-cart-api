module.exports = {
  responses: {
    400: {
      description:
        "***Bad Request*** - The request is malformed. The response contains more details about the error.",
      content: {
        "application/json": {
          schema: {
            oneOf: [
              { $ref: "#/components/schemas/errorMessage" },
              { $ref: "#/components/schemas/errorMessageWithDetails" },
            ],
          },
        },
      },
    },
    401: {
      description: "***Unauthorized*** - The auth token is missing or invalid.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/errorMessage",
          },
        },
      },
    },
    403: {
      description:
        "***Forbidden*** - The auth token does not have the required permission.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/errorMessage",
          },
        },
      },
    },
    404: {
      description: "***Not Found*** - The requested resource was not found.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/errorMessage",
          },
        },
      },
    },
    500: {
      description:
        "***Internal Server Error*** - Something went wrong on the server side.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/errorMessage",
          },
        },
      },
    },
  },
};
