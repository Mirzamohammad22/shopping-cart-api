const logger = require("../utils/logger");
const db = require("../models/index");
const { UniqueConstraintError } = db.Sequelize;

class UserService {
  constructor(model, passwordHasher) {
    (this.userModel = model), (this.passwordHasher = passwordHasher);
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
      console.log('USER!!!!',user)
      const updatedUser = await userToBeUpdated.update(user);
      const result = await this.userModel.findAll()
      logger.debug(result)
      logger.debug(updatedUser);
      return true;
    } catch (err) {
        console.log(err)
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
}

module.exports = UserService;
