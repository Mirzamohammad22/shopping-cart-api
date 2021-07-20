const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const userValidationSchema = require("../middlewares/validators/schemas/user.schema.js");
const validateSchema = require("../middlewares/validators/schemas/schema-validator");
const errorHandler = require("../middlewares/error-handler.middleware");
const defaultValidationSchema = require("../middlewares/validators/schemas/default.schema");
const cacheMiddleware = require("../middlewares/cache.middleware");
const authenticateJwt = require("../middlewares/jwt.middleware");
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
router.get(
  "/:id",
  defaultValidationSchema.urlIdSchema,
  validateSchema,
  authenticateJwt,
  cacheMiddleware,
  userController.getUser
);
router.patch(
  "/:id",
  defaultValidationSchema.urlIdSchema,
  userValidationSchema.updateUserSchema,
  validateSchema,
  authenticateJwt,
  userController.updateUser
);

router.get(
  "/:id/carts",
  defaultValidationSchema.urlIdSchema,
  validateSchema,
  authenticateJwt,
  userController.listUserCarts
);

router.use(errorHandler);

module.exports = router;
