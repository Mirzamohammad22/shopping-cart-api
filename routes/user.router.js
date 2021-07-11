const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const userValidationSchema = require("../middlewares/validators/schemas/user.schema.js");
const validateSchema = require("../middlewares/validators/schemas/schema-validator");
const errorHandler = require("../middlewares/error-handler.middleware");
const urlIdSchema = require("../middlewares/validators/schemas/url-id.schema");

router.post(
  "/",
  userValidationSchema.createUserSchema,
  validateSchema,
  userController.createUser
);
router.post(
  "/login",
  userValidationSchema.loginSchema,
  validateSchema,
  userController.loginUser
);
router.get("/:id", urlIdSchema, validateSchema, userController.getUser);
router.patch(
  "/:id",
  urlIdSchema,
  userValidationSchema.updateUserSchema,
  validateSchema,
  userController.updateUser
);

router.use(errorHandler);

module.exports = router;
