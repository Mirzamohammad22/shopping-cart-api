module.exports = {
  get: {
    tags: ["Item Endpoints"],
    summary: "Get all items",
    description:
      "Get a list of all items or items belonging to a certain category.",
    operationId: "getItems",
    parameters: [
      {
        name: "category",
        in: "query",
        schema: {
          type: "string",
        },
        description: "Filter the list of items based on category",
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
                    $ref: "#/components/schemas/item",
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
      400: {
        $ref: "#/components/responses/400",
      },
      404: {
        $ref: "#/components/responses/404",
      },
      500: {
        $ref: "#/components/responses/500",
      },
    },
  },
};
