const logger = require("../utils/logger");
const { ResourceNotFoundError } = require("../utils/errors/index");

class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  async listItems(filter) {
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
      const items = result.map((item) => item.dataValues);
      return items;
    } else {
      throw ResourceNotFoundError("Items");
    }
  }
}

module.exports = ItemService;
