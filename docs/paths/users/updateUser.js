module.exports = {
  patch: {
    tags: ["User Endpoints"],
    summary: "Update user details",
    security: [
      {
        BearerAuth: [],
      },
    ],
    description:
      "Update the details of a user based on the id provided. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "updateUser",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
    ],
    requestBody: {
      description: "Details of the user to be updated",
      content: {
        "application/json": {
          examples: {
            userDetails: {
              $ref: "#/components/examples/userDetails",
            },
          },
          schema: {
            $ref: "#/components/schemas/userUpdateInput",
          },
        },
      },
    },
    responses: {
      200: {
        description: "***OK*** - User updated successfully.",
        content: {
          "plain/text": {
            schema: {
              type: "string",
              example: "OK",
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
