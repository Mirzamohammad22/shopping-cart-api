const { Router } = require("express");
const errorHandler = require("../middlewares/error-handler.middleware");
const itemController = require("../controllers/item.controller");
const itemValidationSchema = require("../middlewares/validators/schemas/item.schema");
const validateSchema = require("../middlewares/validators/schema-validator");
const defaultSchema = require("../middlewares/validators/schemas/default.schema");
const router = new Router();

router.get(
  "/",
  defaultSchema.paginationSchema,
  itemValidationSchema.listSchema,
  validateSchema,
  itemController.listItems
);
router.use(errorHandler);

module.exports = router;
