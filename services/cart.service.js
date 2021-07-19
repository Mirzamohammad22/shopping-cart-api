const logger = require("../utils/logger");
const { ResourceNotFoundError, ItemError } = require("../utils/errors/index");

class CartService {
  constructor(cartModel, cartItemModel, itemModel) {
    this.cartModel = cartModel;
    this.cartItemModel = cartItemModel;
    this.itemModel = itemModel;
  }

  async #isItemStockAvailable(itemId, quantity) {
    const item = await this.itemModel.findByPk(itemId);
    // If found, check if stock is greater than required
    if (!item) {
      throw new ResourceNotFoundError("Item");
    }
    const sufficient = item.stock >= quantity ? true : false;

    if (!sufficient) {
      throw new ItemError("Insufficient stock to meet quantity");
    }
    return sufficient;
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
    logger.info(`Created Cart:${JSON.stringify(createdCart)}`);
    return createdCart.id;
  }

  async listUserCarts(userId) {
    const userCarts = await this.cartModel.findAll({
      where: { userId: userId },
      attributes: { exclude: ["userId"] },
    });

    logger.debug(`User id:${userId}, carts:${JSON.stringify(userCarts)}`);
    if (userCarts.length === 0) {
      throw new ResourceNotFoundError("Cart");
    }
    return userCarts;
  }

  async listItems(cartId) {
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
        };
      });
    }

    logger.debug(`cartId:${cartId}, items found:${JSON.stringify(items)}`);
    return items;
  }

  async addCartItem(cartId, itemId, transaction, quantity = 1) {
    try {
      // Check if there is enough item stock
      await this.#isItemStockAvailable(itemId, quantity);

      // Deduct requested quantity from item's stock
      const itemDecrement = await this.itemModel.decrement("stock", {
        by: quantity,
        where: {
          id: itemId,
        },
        transaction: transaction,
      });

      logger.debug(`items affected:${JSON.stringify(itemDecrement)}`);

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

  async updateCartItem(cartId, itemId, transaction, quantity) {
    try {
      // Get the cartItem
      const cartItem = await this.cartItemModel.findOne({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
      });

      // No cartItem exists
      if (!cartItem) {
        throw new ResourceNotFoundError("Cart Item");
      }
      // Calculating if stock should be increased or decreased
      let quantityDifference = cartItem.quantity - quantity;

      if (quantityDifference < 0) {
        // Requested quantity is higher than current quantity, decreasing item stocks

        let quantityDifference = Math.abs(quantityDifference);

        // Check if there is enough item stock
        await this.#isItemStockAvailable(itemId, quantityDifference);

        logger.debug(
          `Decreasing stock by ${quantityDifference} for itemId:${itemId}`
        );

        const itemDecrement = await this.itemModel.decrement("stock", {
          by: quantityDifference,
          where: {
            id: itemId,
          },
          transaction: transaction,
        });
        logger.debug(`Decrement result:${JSON.stringify(itemDecrement)}`);
      } else if (quantityDifference > 0) {
        // Requested quantity is lower than current quantity, increasing item stocks
        logger.debug(
          `Increasing stock by ${quantityDifference} for itemId:${itemId}`
        );
        const itemIncrement = await this.itemModel.increment("stock", {
          by: quantityDifference,
          where: {
            id: itemId,
          },
          transaction: transaction,
        });
        logger.debug(`Increment result:${JSON.stringify(itemIncrement)}`);
      } else {
        logger.debug("Requested quantity is same as current cartItem quantity");
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

  async deleteCartItem(cartId, itemId, transaction) {
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
        const itemIncrement = await this.itemModel.increment("stock", {
          by: cartItem.quantity,
          where: {
            id: itemId,
          },
          transaction: transaction,
        });

        logger.debug(`item Incremented:${JSON.stringify(itemIncrement)}`);

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
