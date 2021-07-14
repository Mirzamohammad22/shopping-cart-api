const logger = require("../utils/logger");
const { ResourceNotFoundError, ItemError } = require("../utils/errors/index");

class CartService {
  constructor(cartModel, cartItemModel, itemModel) {
    this.cartModel = cartModel;
    this.cartItemModel = cartItemModel;
    this.itemModel = itemModel;
  }

  async _isItemStockAvailable(itemId, quantity) {
    const item = await this.itemModel.findByPk(itemId);
    // If found, check if stock is greater than required
    if (item) {
      const sufficient = item.stock >= quantity ? true : false;
      if (!sufficient) {
        throw new ItemError("Insufficient stock to meet quantity");
      }
    } else {
      throw new ResourceNotFoundError("Item");
    }
  }

  async createCart(userId) {
    const cartDetails = {
      userId: userId,
    };
    const createdCart = await this.cartModel.create(cartDetails);
    logger.info(`Created Cart:${JSON.stringify(createdCart)}`);
    return createdCart.id;
  }

  async getallUserCartIds(userId) {
    let carts = await this.cartModel.findAll({ where: { userId: userId } });

    if (carts.length > 0) {
      const result = carts.map((cart) => cart.dataValues.id);
      return result;
    } else {
      // No cart exists
      throw new ResourceNotFoundError("Cart");
    }
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

  async addItem(cartId, itemId, transaction, quantity = 1) {
    try {
      // Check if there is enough item stock
      await this._isItemStockAvailable(itemId, quantity);

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
      const cartItem = await this.cartItemModel.findOrCreate({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
        defaults: {
          quantity: quantity,
        },
        transaction: transaction,
      });
      logger.debug(
        `cartItem: ${JSON.stringify(cartItem[0])} created:${cartItem[1]}`
      );

      // cartItem found, not created.Incrementing quantity
      if (!cartItem[1]) {
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

  async updateItem(cartId, itemId, transaction, quantity) {
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
        quantityDifference = Math.abs(quantityDifference);

        // Check if there is enough item stock
        await this._isItemStockAvailable(itemId, quantityDifference);

        logger.debug(
          `Decreasing stock by ${quantityDifference} for itemId:${itemId}`
        );
        const itemDecrement = await this.itemModel.decrement("stock", {
          by: Math.abs(quantityDifference),
          where: {
            id: itemId,
          },
          transaction: transaction,
        });
        logger.debug(`Decrement result:${JSON.stringify(itemDecrement)}`);
      }

      if (quantityDifference > 0) {
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

  async deleteItem(cartId, itemId, transaction) {
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
