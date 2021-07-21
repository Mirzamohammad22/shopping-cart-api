const logger = require("../utils/logger");
const { ResourceNotFoundError, ItemError } = require("../utils/errors/index");

// TODO: move transactions from controller to service.
class CartService {
  constructor(cartModel, cartItemModel, itemModel, sequelize) {
    this.cartModel = cartModel;
    this.cartItemModel = cartItemModel;
    this.itemModel = itemModel;
    this.sequelize = sequelize;
  }

  async #checkItemStockAvailable(itemId, quantity) {
    const item = await this.itemModel.findByPk(itemId);
    if (!item) {
      throw new ResourceNotFoundError("Item");
    }
    // If found, check if stock is greater than quantity required
    const sufficient = item.stock >= quantity ? true : false;
    if (!sufficient) {
      throw new ItemError("Insufficient stock to meet quantity");
    }
    return sufficient;
  }

  async #increaseItemStock(itemId, quantity, transaction) {
    logger.debug(`Increasing stock of itemId:${itemId} by ${quantity}`);
    const item = await this.itemModel.increment("stock", {
      by: quantity,
      where: {
        id: itemId,
      },
      transaction: transaction,
    });
    return item;
  }
  async #decreaseItemStock(itemId, quantity, transaction) {
    logger.debug(`Decreasing stock of itemId:${itemId} by ${quantity}`);
    const item = await this.itemModel.decrement("stock", {
      by: quantity,
      where: {
        id: itemId,
      },
      transaction: transaction,
    });
    return item;
  }

  async listUserCartIds(userId) {
    const userCarts = await this.listUserCarts(userId);
    const userCartIds = userCarts.map((cart) => cart.dataValues.id);
    return userCartIds;
  }

  async createCart(userId) {
    const cartDetails = {
      userId: userId,
    };
    const createdCart = await this.cartModel.create(cartDetails);
    logger.info(`Created Cart: ${JSON.stringify(createdCart)}`);
    return createdCart.id;
  }

  async listUserCarts(userId) {
    const userCarts = await this.cartModel.findAll({
      where: { userId: userId },
      attributes: { exclude: ["userId"] },
    });
    logger.debug(`User id: ${userId}, Carts: ${JSON.stringify(userCarts)}`);
    if (userCarts.length === 0) {
      throw new ResourceNotFoundError("Cart");
    }
    return userCarts;
  }

  async listCartItems(cartId) {
    let items = undefined;
    const cartItems = await this.cartItemModel.findAll({
      where: {
        cartId: cartId,
      },
      attributes: ["itemId", "quantity"],
      include: this.itemModel,
    });

    // If any items found, return formatted items
    if (cartItems.length > 0) {
      items = cartItems.map((cartItem) => {
        return {
          id: cartItem.dataValues.itemId,
          name: cartItem.dataValues.Item.name,
          quantity: cartItem.dataValues.quantity,
          price: cartItem.dataValues.Item.price,
        };
      });
    }
    logger.debug(`cartId:${cartId}, items found:${JSON.stringify(items)}`);
    return items;
  }

  async addCartItem(cartId, itemId, quantity = 1) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.#checkItemStockAvailable(itemId, quantity);
      await this.#decreaseItemStock(itemId, quantity, transaction);

      // Get or create cart item relationship with requested quantity
      const [cartItem, created] = await this.cartItemModel.findOrCreate({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
        defaults: {
          quantity: quantity,
        },
        transaction: transaction,
      });
      logger.debug(`cartItem: ${JSON.stringify(cartItem)} created:${created}`);

      // cartItem found, not created.Incrementing quantity
      if (!created) {
        await this.cartItemModel.increment("quantity", {
          by: quantity,
          where: {
            cartId: cartId,
            itemId: itemId,
          },
          transaction: transaction,
        });
        logger.debug(`cartItem quantity incremented by ${quantity}`);
      }
      logger.info(
        `CartItem with cartId:${cartId},itemId:${itemId} with quantity:${quantity} added successfully`
      );
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async updateCartItem(cartId, itemId, quantity) {
    const transaction = await this.sequelize.transaction();
    try {
      // Get the cartItem
      const cartItem = await this.cartItemModel.findOne({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
        transaction: transaction,
      });

      // No cartItem exists
      if (!cartItem) {
        throw new ResourceNotFoundError("Cart Item");
      }

      // Calculating if stock should be increased or decreased
      const quantityDifference = quantity - cartItem.quantity;

      if (quantityDifference !== 0) {
        if (quantityDifference > 0) {
          await this.#checkItemStockAvailable(itemId, quantityDifference);
          await this.#decreaseItemStock(
            itemId,
            quantityDifference,
            transaction
          );
        } else {
          await this.#increaseItemStock(
            itemId,
            Math.abs(quantityDifference),
            transaction
          );
        }
      }

      const cartItemUpdated = await cartItem.update(
        { quantity: quantity },
        {
          where: {
            cartId: cartId,
            itemId: itemId,
          },
          transaction: transaction,
        }
      );

      logger.debug(`carItem updated:${JSON.stringify(cartItemUpdated)}`);

      logger.info(
        `CartItem with cartId:${cartId},itemId:${itemId} with quantity:${quantity} updated successfully`
      );
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async deleteCartItem(cartId, itemId) {
    const transaction = await this.sequelize.transaction();
    try {
      // get cartItem
      const cartItem = await this.cartItemModel.findOne({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
      });

      // if found, add the quantity back to item stock
      if (cartItem) {
        await this.#increaseItemStock(itemId, cartItem.quantity, transaction);
        await cartItem.destroy({ transaction: transaction });
        logger.info(
          `CartItem with cartId:${cartId},itemId:${itemId} deleted successfully`
        );
      }

      logger.info(
        `CartItem with cartId:${cartId},itemId:${itemId} delete complete`
      );
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

module.exports = CartService;
