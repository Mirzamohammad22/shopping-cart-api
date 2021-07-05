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
}

module.exports = UserService;
