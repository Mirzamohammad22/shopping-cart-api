const {
  UniqueConstraintError,
  ForeignKeyConstraintError,
} = require("sequelize");
const { makeMockModels } = require("sequelize-jest-helpers");
const {
  ResourceNotFoundError,
  UserError,
  LoginError,
  ItemError,
} = require("../../src/utils/errors/index");
const cartServiceFixtures = require("./fixtures/cart.service.fixture");
const CartService = require("../../src/services/cart.service");
const mockModels = makeMockModels(
  {
    Cart: {
      findAll: undefined,
      findByPk: undefined,
      findOrCreate: undefined,
      findOne: undefined,
      create: undefined,
    },
    Item: {
      findAll: undefined,
      findByPk: undefined,
      findOrCreate: undefined,
      findOne: undefined,
      decrement: undefined,
      increment: undefined,
    },
    CartItem: {
      findAll: undefined,
      findByPk: undefined,
      findOrCreate: undefined,
      findOne: undefined,
      decrement: undefined,
      increment: undefined,
      update: undefined,
    },
  },
);

const transaction = {
  commit: jest.fn().mockResolvedValue(true),
  rollback: jest.fn().mockResolvedValue(true),
};

const cartService = new CartService(
  mockModels.Cart,
  mockModels.CartItem,
  mockModels.Item
);

describe("cartService", () => {
  describe("createCart", () => {
    it("Should return cartId for valid user id", async () => {
      // Given
      mockModels.Cart.create = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.createResolvedValue);

      // When
      const result = await cartService.createCart(3);

      // Then
      expect(result).toEqual(cartServiceFixtures.createResolvedValue.id);
    });
    it("Should throw error for non-existent user id", async () => {
      // Given
      error = new ForeignKeyConstraintError();
      mockModels.Cart.create = jest.fn().mockRejectedValue(error);
      try {
        // When
        const result = await cartService.createCart(3);
      } catch (err) {
        // Then
        expect(err).toBe(error);
      }
    });
  });
  describe("listUserCarts", () => {
    it("Should return existing carts for given user id", async () => {
      // Given
      mockModels.Cart.findAll = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findAllResolvedValueCart);

      // When
      const result = await cartService.listUserCarts(1);

      // Then
      expect(result).toEqual(cartServiceFixtures.findAllResolvedValueCart);
    });

    it("Should throw error if not carts exist for given user id", async () => {
      // Given
      mockModels.Cart.findAll = jest.fn().mockResolvedValue([]);
      try {
        // When
        const result = await cartService.listUserCarts(1);
      } catch (err) {
        // Then
        expect(err.name).toBe(ResourceNotFoundError.name);
      }
    });
  });
  describe("listUserCartIds", () => {
    it("Should return existing carts for given user id", async () => {
      // Given
      cartService.listUserCarts = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.listUserCartsData);

      // When
      const result = await cartService.listUserCartIds(1);

      // Then
      expect(result).toEqual(cartServiceFixtures.listUserCartIdsData);
    });
  });
  describe("listItems", () => {
    it("Should return undefined if no items in cart", async () => {
      // Given
      mockModels.CartItem.findAll = jest.fn().mockResolvedValue([]);

      // When
      const result = await cartService.listItems(1);

      // Then
      expect(result).toEqual(undefined);
    });
    describe("listItems", () => {
      it("Should return undefined if no items in cart", async () => {
        // Given
        mockModels.CartItem.findAll = jest.fn().mockResolvedValue([]);

        // When
        const result = await cartService.listItems(1);

        // Then
        expect(result).toEqual(undefined);
      });
      it("Should return items list if they exist in cart", async () => {
        // Given
        mockModels.CartItem.findAll = jest
          .fn()
          .mockResolvedValue(cartServiceFixtures.findAllResolvedValueCartItem);

        // When
        const result = await cartService.listItems(1);

        // Then
        expect(result).toEqual(cartServiceFixtures.listItemData);
      });
    });
  });
  describe("addItem", () => {
    it("Should add an item to cart with enough quantity", async () => {
      // Given
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkResolvedValueItem);
      mockModels.CartItem.findOrCreate = jest
        .fn()
        .mockResolvedValue(
          cartServiceFixtures.findOrCreateResolvedValueCreated
        );
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);

      // When
      const result = await cartService.addCartItem(1, 4, transaction);

      // Then
      expect(result).toEqual(true);
    });
    it("Should throw error if item stock not enough", async () => {
      // Given
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkResolvedValueItem);
      try {
        // When
        const result = await cartService.addCartItem(
          1,
          4,
          transaction,
          10000000
        );
      } catch (err) {
        // Then
        expect(err.name).toEqual(ItemError.name);
      }
    });
    it("Should throw error if item doesnt exist", async () => {
      // Given
      mockModels.Item.findByPk = jest.fn().mockResolvedValue(null);
      try {
        // When
        const result = await cartService.addCartItem(1, 4, transaction, 10);
      } catch (err) {
        // Then
        expect(err.name).toEqual(ResourceNotFoundError.name);
      }
    });
    it("Should increment if item previously added", async () => {
      // Given
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkResolvedValueItem);
      mockModels.CartItem.findOrCreate = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOrCreateResolvedValueFound);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);
      mockModels.CartItem.increment = jest.fn().mockResolvedValue([[null, 1]]);

      // When
      const result = await cartService.addCartItem(1, 4, transaction, 10);
      expect(result).toBe(true);
    });
  });

  describe("updateCartItem", () => {
    it("Should throw for non-existing cartItem ", async () => {
      // Given

      mockModels.CartItem.findOne = jest.fn().mockResolvedValue(null);

      try {
        // When
        const result = await cartService.updateCartItem(1, 4, transaction, 10);
      } catch (err) {
        // Then
        expect(err.name).toEqual(ResourceNotFoundError.name);
      }
    });
    it("Should decrease item stock and update cartItem for higher requested quantity", async () => {
      // Given

      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneResolvedValueCartItem);
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkResolvedValueItem);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);
      cartServiceFixtures.findOneResolvedValueCartItem.update = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.updateResolvedValueCartItem);

      try {
        // When
        const result = await cartService.updateCartItem(1, 4, transaction, 600);
        expect(result).toBe(true);
      } catch (err) {
        console.log(err);
        // Then
        expect(err.name).toEqual(ResourceNotFoundError.name);
      }
    });

    it("Should decrease item stock and update cartItem for higher requested quantity", async () => {
      // Given
      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneResolvedValueCartItem);
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkResolvedValueItem);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);
      cartServiceFixtures.findOneResolvedValueCartItem.update = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.updateResolvedValueCartItem);

      // When
      const result = await cartService.updateCartItem(1, 4, transaction, 600);

      // Then
      expect(result).toBe(true);
    });

    it("Should increase item stock and update cartItem for higher requested quantity", async () => {
      // Given
      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneResolvedValueCartItem);
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkResolvedValueItem);
      mockModels.Item.increment = jest.fn().mockResolvedValue([[null, 1]]);
      cartServiceFixtures.findOneResolvedValueCartItem.update = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.updateResolvedValueCartItem);

      // When
      const result = await cartService.updateCartItem(1, 4, transaction, 400);

      // Then
      expect(result).toBe(true);
    });
  });
  describe("deleteCartItem", () => {
    it("Should delete existing cartItem with valid inputs", async () => {
      // Given
      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneResolvedValueCartItem);
      cartServiceFixtures.findOneResolvedValueCartItem.destroy = jest
        .fn()
        .mockResolvedValue(true);

      // When
      const result = await cartService.deleteCartItem(1, 4, transaction);

      // Then
      expect(result).toBe(true);
    });
  });
});
