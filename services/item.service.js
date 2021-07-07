const logger = require("../utils/logger");

class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  async listItems(filter) {
    try {
      let items = undefined;
      const attributesToExclude = ["createdAt", "updatedAt"];
      logger.info(`Getting items with filters:${JSON.stringify(filter)}`);
      const result = await this.itemModel.findAll({
        where: filter,
        attributes: {
          exclude: attributesToExclude,
        },
      });

      logger.info(`Items Found:${result.length}`);
      if (result.length > 0) {
        items = result.map((item) => item.dataValues);
      }

      console.log(items);
      return items;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ItemService;
