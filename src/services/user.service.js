const logger = require("../utils/logger");

const {
  UserError,
  ResourceNotFoundError,
  LoginError,
} = require("../utils/errors/index");
const { UniqueConstraintError } = require("sequelize");
const constants = require("../utils/constants");

const jwtSecret = process.env.JWT_SECRET;

class UserService {
  constructor(userModel, passwordHasher, jwt) {
    this.userModel = userModel;
    this.passwordHasher = passwordHasher;
    this.jwt = jwt;
  }

  async hashPassword(password, saltRounds = 10) {
    return await this.passwordHasher.hash(password, saltRounds);
  }

  async createUser(email, password, firstName, lastName = undefined) {
    const [user, created] = await this.userModel.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
    });

    if (!created) {
      throw new UserError("Email already registered");
    }
    logger.debug(`User created:${JSON.stringify(user)}`);
    logger.info(`Created User with email:${user.email} Successfully`);
    return user.id;
  }

  async updateUser(id, details) {
    try {
      const userToBeUpdated = await this.userModel.findByPk(id);

      // No user exists for given id
      if (!userToBeUpdated) {
        throw new ResourceNotFoundError("User");
      }
      const updatedUser = await userToBeUpdated.update(details);

      logger.debug(updatedUser);
      logger.info(`Updated User with id:${id} successfully`);
      return true;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new UserError("Email already registered");
      }
      throw err;
    }
  }

  async getUser(userId) {
    const result = await this.userModel.findByPk(userId);
    if (!result) {
      throw new ResourceNotFoundError("User");
    }
    const user = {
      id: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
    };
    return user;
  }

  async loginUser(email, password) {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new LoginError("Email not registered");
    }
    logger.debug("userFound:", user);
    const password_valid = await this.passwordHasher.compare(
      password,
      user.password
    );
    logger.debug("PASSWORD VALID:", password_valid);
    if (!password_valid) {
      throw new LoginError("Invalid credentials");
    }
    const token = await this.jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: constants.DAY_IN_SECONDS }
    );

    logger.debug("TOKEN:", token);
    return token;
  }
}

module.exports = UserService;
