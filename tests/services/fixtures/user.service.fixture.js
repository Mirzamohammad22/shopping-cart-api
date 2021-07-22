const findOrCreateUserCreated = [
  {
    id: 9,
    password: "$2b$10$/OSb2GCKyRQI/zu61l1jOeE9VXBIVkwZ3z.75E2h2ILfZ3XGDjryu",
    firstName: "12345",
    lastName: "ABCD",
    email: "12345@gmail.com",
    updatedAt: "2021-07-17",
    createdAt: "2021-07-17",
  },
  true,
];

const findOrCreateUserFound = [
  {
    id: 9,
    password: "$2b$10$/OSb2GCKyRQI/zu61l1jOeE9VXBIVkwZ3z.75E2h2ILfZ3XGDjryu",
    firstName: "12345",
    lastName: "ABCD",
    email: "12345@gmail.com",
    updatedAt: "2021-07-17",
    createdAt: "2021-07-17",
  },
  false,
];

const updateUserData = (createUserData = {
  email: "12345@gmail.com",
  password: "12345678",
  firstName: "12345",
  lastName: "ABCD",
});

const findOneUser = (findByPkUser = {
  id: 3,
  email: "abc@gmail.com",
  password: "$2b$10$1Gf/AntHS6QPIn4NxMkUBuO7A69ZsjEnHFg6eqfgjsWQlHyfAjNH6",
  firstName: "hello",
  lastName: "world",
  createdAt: "2021-07-09",
  updatedAt: "2021-07-09",
});

module.exports = {
  findOrCreateUserCreated,
  findOrCreateUserFound,
  createUserData,
  updateUserData,
  findByPkUser,
  findOneUser,
};
