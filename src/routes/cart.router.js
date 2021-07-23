const { Router } = require("express");
const router = Router();
const errorHandler = require("../middlewares/error-handler.middleware");
const Authenticate = require("../middlewares/jwt.middleware");
const cartController = require("../controllers/cart.controller");
const cartValidationSchema = require("../middlewares/validators/schemas/cart.schema");
const validateSchema = require("../middlewares/validators/schema-validator");

router.use(Authenticate);

router.post("/", cartController.createCart);
router.post(
  "/:cartId/items",
  cartValidationSchema.addCartItemSchema,
  validateSchema,
  cartController.addItemToCart
);
router.get(
  "/:cartId/items",
  cartValidationSchema.listCartItemSchema,
  validateSchema,
  cartController.listItemsInCart
);
router.delete(
  "/:cartId/items/:itemId",
  cartValidationSchema.deleteCartItemSchema,
  validateSchema,
  cartController.deleteItemFromCart
);
router.patch(
  "/:cartId/items/:itemId",
  cartValidationSchema.updateCartItemSchema,
  validateSchema,
  cartController.updateItemInCart
);

router.use(errorHandler);

module.exports = router;
