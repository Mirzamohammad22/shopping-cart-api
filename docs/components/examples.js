module.exports = {
  examples: {
    userDetails: {
      summary: "User with all details",
      value: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
        password: "abcd@1234",
      },
    },
    userDetailsWithoutLastName: {
      summary: "User without last name",
      value: {
        firstName: "Jane",
        email: "jane@gmail.com",
        password: "xyz@1234",
      },
    },
    userLoginDetails: {
      summary: "User details for login",
      value: {
        email: "john.doe@gmail.com",
        password: "abcd@1234",
      },
    },
    cartItemDetails: {
      summary: "Details of item",
      value: {
        itemId: 1,
        quantity: 10,
      },
    },
    updateCartItemDetails: {
      summary: "Quantity to be updated for item",
      value: {
        quantity: 10,
      },
    },
  },
};
