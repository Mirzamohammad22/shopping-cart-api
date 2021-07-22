module.exports = {
  schemas: {
    userCreateInput: {
      type: "object",
      properties: {
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
        password: {
          type: "string",
          description: "User's password",
          example: "asd@1234",
        },
      },
      required: ["firstName", "email", "password"],
    },
    userUpdateInput: {
      type: "object",
      properties: {
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
        password: {
          type: "string",
          description: "User's password",
          example: "asd@1234",
        },
      },
    },
    UserLoginInput: {
      type: "object",
      properties: {
        email: {
          type: "email",
          description: "User's email address",
          example: "john.doe@gmail.com",
        },
        password: {
          type: "string",
          description: "User's password",
          example: "asd@1234",
        },
      },
      required: ["email", "password"],
    },
    Cart: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "ID of the cart",
          example: "123",
        },
        createdAt: {
          type: "integer",
          description: "Creation time (epoch)",
          example: "1626894160",
        },
        updatedAt: {
          type: "integer",
          description: "Updation time in (epoch)",
          example: "1626894180",
        },
      },
    },
    Item: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "ID of the item",
          example: "123",
        },
        name: {
          type: "string",
          description: "Name of the item",
          example: "Laptop",
        },
        category: {
          type: "string",
          description: "Category of the item",
          example: "Electronics",
        },
        stock: {
          type: "integer",
          description: "Stock avaialble for the item",
          example: 100,
        },
        price: {
          type: "integer",
          description: "Price of the item",
          example: "2500",
        },
        sku: {
          type: "integer",
          description: "Stock Keeping Unit of the item",
          example: "12345",
        },
      },
    },
    CartItem: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "ID of the item in the cart",
          example: 123,
        },
        name: {
          type: "string",
          description: "Name of the item in the cart",
          example: "Laptop",
        },
        quantity: {
          type: "integer",
          description: "Quantity of the item present in the cart",
          example: 100,
        },
      },
    },
    cartItemInput: {
      type: "object",
      properties: {
        itemId: {
          type: "integer",
          description: "Id of the item",
          example: 1,
        },
        quantity: {
          type: "integer",
          description: "Quantity of the item",
          example: 10,
        },
      },
      required: ["itemId"],
    },
    updateCartItemInput: {
      type: "object",
      properties: {
        quantity: {
          type: "integer",
          description: "Quantity of the item",
          example: 10,
        },
      },
      required: ["quantity"],
    },
    errorMessage: {
      type: "object",
      properties: {
        error: {
          type: "object",
          properties:{
            message:{
              type:"string"
            }
          }
        }
      }
    },
    errorMessageWithDetails: {
      type: "object",
      properties: {
        error: {
          type: "object",
          properties:{
            message:{
              type:"string"
            },
            details:{
              type:"object"
            }
          }
        }
      }
    }
  },
};
