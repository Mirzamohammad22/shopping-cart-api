const { Router } = require("express");
const router = Router();
const errorHandler = require("../middlewares/error-handler.middleware");
const itemController = require("../controllers/item.controller");
const itemValidationSchema = require("../middlewares/validators/schemas/item.schema");
const validateSchema = require("../middlewares/validators/schemas/schema-validator");

router.get(
  "/",
  itemValidationSchema.listSchema,
  validateSchema,
  itemController.listItems
);
router.use(errorHandler);

module.exports = router;
