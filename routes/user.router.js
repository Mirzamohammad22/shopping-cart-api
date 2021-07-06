const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const userSchema = require("../middlewares/validators/schemas/user.schema.js");
const validateSchema = require("../middlewares/validators/schemas/schema-validator");
const errorHandler = require("../middlewares/error-handler.middleware");
const urlIdSchema = require("../middlewares/validators/schemas/url-id.schema");


router.post("/", userSchema.createUserSchema, validateSchema, userController.createUser);
router.get("/:id", userController.getUser);
router.patch(
  "/:id",
  urlIdSchema,
  userSchema.updateUserSchema,
  validateSchema,
  userController.updateUser
);
router.use(errorHandler);

module.exports = router;
