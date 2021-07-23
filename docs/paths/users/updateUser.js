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
      "Update the details of a user based on the id provided. This endpoint requires the requested user's Auth token.",
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
      204: {
        description: "***No Content*** - Updated user successfully.",
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
