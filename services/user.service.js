const logger = require("../utils/logger");
const db = require("../models/index");
const { UniqueConstraintError } = db.Sequelize;

// TODO: For development purposes,remove default after env injection
const jwtSecret = process.env.JWT_SECRET || "secretkey";

class UserService {
  constructor(model, passwordHasher, jwt) {
    (this.userModel = model), (this.passwordHasher = passwordHasher);
    this.jwt = jwt;
  }

  async hashPassword(password, saltRounds = 10) {
    return await this.passwordHasher.hash(password, saltRounds);
  }

  async createUser(user) {
    try {
      const createdUser = await this.userModel.create(user);
      return createdUser.id;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return undefined;
      } else {
        throw err;
      }
    }
  }

  async updateUser(id, user) {
    try {
      const userToBeUpdated = await this.userModel.findByPk(id);

      // No user exists for given
      if (!userToBeUpdated) {
        return undefined;
      }
      logger.debug("USER!!!!", user);
      const updatedUser = await userToBeUpdated.update(user);
      const result = await this.userModel.findAll();
      logger.debug(result);
      logger.debug(updatedUser);
      return true;
    } catch (err) {
      logger.debug(err);
      throw err;
    }
  }

  async getUser(filter) {
    try {
      const result = await this.userModel.findOne({ where: filter });
      let user = undefined;
      if (result) {
        user = {
          email: result.email,
          firstName: result.firstName,
          lastName: result.LastName,
        };
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async loginUser(email, password) {
    try {
      let token = undefined;
      const user = await this.userModel.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        logger.debug("userFound:", user);
        const password_valid = await this.passwordHasher.compare(
          password,
          user.password
        );
        logger.debug("PASSWORD VALID:", password_valid);
        if (password_valid) {
          token = await this.jwt.sign(
            { id: user.id, email: user.email },
            jwtSecret,
            { expiresIn: 60 * 60 }
          );
        }
        logger.debug("TOKEN:",token)
      }
      return token;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
