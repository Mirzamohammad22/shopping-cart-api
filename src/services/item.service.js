const logger = require("../utils/logger");
const { ResourceNotFoundError } = require("../utils/errors/index");

class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  async listItems(category = undefined, limit = 5, offset = 0) {
    const attributesToExclude = ["createdAt", "updatedAt"];
    const filter = {
      // where clause added only if category given
      ...(category !== undefined
        ? { where: { category: category } }
        : undefined),
      limit: limit,
      offset: offset,
      attributes: {
        exclude: attributesToExclude,
      },
    };

    const result = await this.itemModel.findAndCountAll(filter);
    logger.debug(`Items Found:${result.rows.length}`);

    if (result.rows.length === 0) {
      throw new ResourceNotFoundError("Items");
    }
    const items = {
      count: result.count,
      rows: result.rows.map((item) => item.dataValues),
    };

    return items;
  }
}

module.exports = ItemService;
