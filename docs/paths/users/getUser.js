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
      "Get the details of a user based on the id provided. This endpoint can only be accessed by the user himself using the auth token for authorization.",
    operationId: "getUser",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
    ],
    responses: {
      200: {
        $ref: "#/components/responses/user",
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
