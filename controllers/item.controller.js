const logger = require("../utils/logger");
const db = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const ItemService = require("../services/item.service");

const itemService = new ItemService(db.Item);
async function listItems(req, res, next) {
  try {
    const itemsList = await itemService.listItems(req.query);
    logger.debug(itemsList);
    if (!itemsList) {
      const noItemsFoundError = new Error("Items Not Found");
      noItemsFoundError.statusCode = StatusCodes.NOT_FOUND;
      throw noItemsFoundError;
    }
    res.json(itemsList);
  } catch (err) {
    next(err);
  }
}

module.exports = { listItems };
