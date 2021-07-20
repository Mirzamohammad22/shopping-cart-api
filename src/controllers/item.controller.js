const logger = require("../utils/logger");
const db = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const ItemService = require("../services/item.service");
const pagination = require("../utils/pagination");
const itemService = new ItemService(db.Item);

async function listItems(req, res, next) {
  try {
    const category = req.query.category;
    const page = req.query.page ? req.query.page : 1;
    const size = req.query.size ? req.query.size : 5;
    const { offset, limit } = pagination.getPagination(page, size);

    const items = await itemService.listItems(category, limit, offset);
    const paginatedData = pagination.getPaginatedDataFormat(items, page, limit);
    res.json(paginatedData);
  } catch (err) {
    next(err);
  }
}

module.exports = { listItems };
