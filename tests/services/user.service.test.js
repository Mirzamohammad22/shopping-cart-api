const UserService = require("../../src/services/user.service");
const { UniqueConstraintError } = require("sequelize");
const { makeMockModels } = require("sequelize-jest-helpers");
const {
  ResourceNotFoundError,
  UserError,
  LoginError,
} = require("../../src/utils/errors/index");

const userServiceFixtures = require("./fixtures/user.service.fixture");
const mockModels = makeMockModels({
  User: {
    findAll: undefined,
    findByPk: undefined,
    findOrCreate: undefined,
    findOne: undefined,
  },
});
const mockedPasswordHasher = {
  verify: undefined,
  compare: undefined,
};
const mockedJwt = {
  sign: undefined,
};
const userService = new UserService(
  mockModels.User,
  mockedPasswordHasher,
  mockedJwt
);

describe("UserService", () => {
  describe("hashPassword", () => {
    it("Should return a hashed password for valid input", async () => {
      // Given
      const password = "passwordabcd";
      mockedPasswordHasher.hash = jest
        .fn()
        .mockResolvedValue("hashedpasswordabcd");

      // When
      const result = await userService.hashPassword(password, 10);

      // Then
      expect(result).not.toBe("passwordabcd");
    });
    it("Should throw an error when hash gets rejected", async () => {
      // Given
      const hashError = new Error("HASH ERROR");
      const password = "passwordabcd";
      mockedPasswordHasher.hash = jest.fn().mockRejectedValue(hashError);

      try {
        // When
        await userService.hashPassword(password, 10);
      } catch (err) {
        // Then
        expect(err).toBe(hashError);
      }
    });
  });

  describe("createUser", () => {
    it("Should return a Id for valid input", async () => {
      // Given
      const { email, password, firstName, lastName } =
        userServiceFixtures.createUserData;
      mockModels.User.findOrCreate = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findOrCreateUserCreated);

      // When
      const result = await userService.createUser(
        email,
        password,
        firstName,
        lastName
      );

      // Then
      const expected = userServiceFixtures.findOrCreateUserCreated[0].id;
      expect(result).toBe(expected);
    });
    it("Should thow an error for registered email", async () => {
      // Given
      const { email, password, firstName, lastName } =
        userServiceFixtures.createUserData;

      mockModels.User.findOrCreate = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findOrCreateUserFound);
      try {
        // When

        await userService.createUser(email, password, firstName, lastName);
      } catch (err) {
        // Then
        expect(err.name).toBe(UserError.name);
      }
    });
  });

  describe("updateUser", () => {
    it("Should throw error for non-existing user", async () => {
      // Given
      mockModels.User.findByPk = jest.fn().mockResolvedValue(null);
      try {
        // When
        await userService.updateUser(1, {});
      } catch (err) {
        // Then
        expect(err.name).toBe(ResourceNotFoundError.name);
      }
    });
    it("Should throw error for already registered email", async () => {
      // Given
      userServiceFixtures.findByPkUser.update = jest
        .fn()
        .mockRejectedValue(new UniqueConstraintError());
      mockModels.User.findByPk = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findByPkUser);
      try {
        // When
        await userService.updateUser(1, {});
      } catch (err) {
        // Then
        expect(err.name).toBe(UserError.name);
      }
    });
    it("Should return true for successfull update", async () => {
      // Given
      userServiceFixtures.findByPkUser.update = jest.fn().mockResolvedValue({});
      mockModels.User.findByPk = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findByPkUser);

      // When
      const result = await userService.updateUser(
        1,
        userServiceFixtures.updateUserData
      );
      // Then
      expect(result).toBe(true);
    });
  });

  describe("login", () => {
    it("Should throw error for invalid password", async () => {
      // Given
      const { email, password } = userServiceFixtures.createUserData;
      mockModels.User.findOne = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findOneUser);
      mockedPasswordHasher.compare = jest.fn().mockResolvedValue(false);
      try {
        // When
        await userService.loginUser(email, password);
      } catch (err) {
        expect(err.name).toBe(LoginError.name);
      }
    });
    it("Should throw error for unregistered email", async () => {
      // Given
      const { email, password } = userServiceFixtures.createUserData;
      mockModels.User.findOne = jest.fn().mockResolvedValue(null);
      try {
        // When
        await userService.loginUser(email, password);
      } catch (err) {
        expect(err.name).toBe(LoginError.name);
      }
    });
    it("Should return token for valid credentials", async () => {
      // Given
      const jwtToken = "jwttoken";
      const { email, password } = userServiceFixtures.createUserData;
      mockModels.User.findOne = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findOneUser);
      mockedPasswordHasher.compare = jest.fn().mockResolvedValue(true);
      mockedJwt.sign = jest.fn().mockResolvedValue(jwtToken);

      // When
      const result = await userService.loginUser(email, password);

      // Then
      expect(result).toBe(jwtToken);
    });
  });

  describe("getUser", () => {
    it("Should return data for existing user", async () => {
      // Given
      mockModels.User.findByPk = jest
        .fn()
        .mockResolvedValue(userServiceFixtures.findByPkUser);

      // When
      const result = await userService.getUser(3);

      // Then
      const expected = {
        id: userServiceFixtures.findByPkUser.id,
        email: userServiceFixtures.findByPkUser.email,
        firstName: userServiceFixtures.findByPkUser.firstName,
        lastName: userServiceFixtures.findByPkUser.lastName,
      };
      expect(result).toEqual(expected);
    });
    it("Should throw error for non-existing user", async () => {
      // Given
      mockModels.User.findByPk = jest.fn().mockResolvedValue(null);
      try {
        // When
        await userService.getUser(3);
      } catch (err) {
        // Then
        expect(err.name).toBe(ResourceNotFoundError.name);
      }
    });
  });
});
