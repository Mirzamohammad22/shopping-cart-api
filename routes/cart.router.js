const { Router } = require("express");
const router = Router();
const errorHandler = require("../middlewares/error-handler.middleware");
const Authenticate = require("../middlewares/jwt.middleware");
const cartController = require("../controllers/cart.controller");

router.use(Authenticate);

router.post("/", cartController.createCart);
router.post("/:cartId/items", cartController.addItemToCart);
router.get("/:cartId/items", cartController.listItemsInCart);
router.delete("/:cartId/items/:itemId", cartController.deleteItemFromCart);
router.patch("/:cartId/items/:itemId", cartController.editItemInCart);
router.use(errorHandler);

module.exports = router;
