const logger = require("../utils/logger");
class CartService {
  constructor(cartModel, cartItemModel, itemModel) {
    this.cartModel = cartModel;
    this.cartItemModel = cartItemModel;
    this.itemModel = itemModel;
  }

  async create(userId) {
    try {
      const cartDetails = {
        userId: userId,
      };
      const createdCart = await this.cartModel.create(cartDetails);
      logger.info(`Created Cart:${JSON.stringify(createdCart)}`);
      return createdCart.id;
    } catch (err) {
      throw err;
    }
  }

  async listItems(cartId) {
    try {
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
    } catch (err) {
      throw err;
    }
  }

  async addItem(cartId, itemId, transaction, quantity = 1) {
    try {
      // Deduct requested quantity from item's stock
      const itemDecrement = await this.itemModel.decrement("stock", {
        by: quantity,
        where: {
          id: itemId,
        },
        transaction: transaction,
      });

      logger.debug(`items affected:${JSON.stringify(itemDecrement)}`);

      // Created cart item relationship with requested quantity
      const result = await this.cartItemModel.create(
        {
          cartId: cartId,
          itemId: itemId,
          quantity: quantity,
        },
        { transaction: transaction }
      );

      logger.info(`Created cartItem:${JSON.stringify(result)}`);
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
      if (cartItem) {
        // Calculating if stock should be increased or decreased
        let quantityDifference = cartItem.quantity - quantity;
        if (quantityDifference < 0) {
          // Requested quantity is higher than current quantity, decreasing item stocks
          quantityDifference = Math.abs(quantityDifference);
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
      }
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async deleteItem(cartId, itemId, transaction) {
    try {
      const cartItem = await this.cartItemModel.findOne({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
      });
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
