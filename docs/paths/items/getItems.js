module.exports = {
  get: {
    tags: ["Item Endpoints"],
    summary: "Get all items",
    description: "Get a list of items ",
    operationId: "getItems",
    parameters: [
      {
        name: "category",
        in: "query",
        schema: {
          type: "string",
        },
        description: "Get a list of items belonging to the category provided",
      },
      {
        $ref: "#/components/parameters/pageParam",
      },
      {
        $ref: "#/components/parameters/sizeParam",
      },
    ],
    responses: {
      200: {
        description: "***OK*** - Returns a list of items",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                totalCount: {
                  type: "integer",
                  description: "Total count of the items",
                  example: "10",
                },
                data: {
                  type: "array",
                  description: "List of the items",
                  items: {
                    $ref: "#/components/schemas/Item",
                  },
                },
                totalPages: {
                  type: "integer",
                  description: "Total number of pages",
                  example: "10",
                },
                currentPage: {
                  type: "integer",
                  description: "Current page number",
                  example: "1",
                },
              },
            },
          },
        },
      },
      400:{
        $ref: "#/components/responses/400",
      },
      404:{
        $ref: "#/components/responses/404",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
