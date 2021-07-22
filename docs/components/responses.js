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
    invalidCredentials: {
      description:
        "***Unauthorized*** - The credentials provided for login are invalid.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/errorMessage",
          },
        },
      },
    },
    invalidCartItemInput: {
      description:
        "***Bad Request*** - The request is malformed. The response contains more details about the error.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                    example: "Invalid input",
                  },
                  details: {
                    type: "array",
                    description: "Input validation errors",
                    items: {
                      $ref: "#/components/schemas/invalidCartItemInput",
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
      description: "***Unauthorized*** - The auth bearer token is missing.",
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
    user: {
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
    userCarts: {
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
                      $ref: "#/components/schemas/Cart",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
