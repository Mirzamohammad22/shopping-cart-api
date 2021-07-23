const { ForeignKeyConstraintError } = require("sequelize");
const { makeMockModels } = require("sequelize-jest-helpers");
const {
  ResourceNotFoundError,
  ItemError,
} = require("../../src/utils/errors/index");
const cartServiceFixtures = require("./fixtures/cart.service.fixture");
const CartService = require("../../src/services/cart.service");
const mockModels = makeMockModels({
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
});

const mockSequelize = {
  transaction: jest.fn().mockResolvedValue({
    commit: jest.fn().mockResolvedValue(true),
    rollback: jest.fn().mockResolvedValue(true),
  }),
};

const cartService = new CartService(
  mockModels.Cart,
  mockModels.CartItem,
  mockModels.Item,
  mockSequelize
);

describe("cartService", () => {
  describe("createCart", () => {
    it("Should return cartId for valid user id", async () => {
      // Given
      mockModels.Cart.create = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.createCart);

      // When
      const result = await cartService.createCart(3);

      // Then
      expect(result).toEqual(cartServiceFixtures.createCart.id);
    });
    it("Should throw error for non-existent user id", async () => {
      // Given
      error = new ForeignKeyConstraintError();
      mockModels.Cart.create = jest.fn().mockRejectedValue(error);
      try {
        // When
        await cartService.createCart(3);
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
        .mockResolvedValue(cartServiceFixtures.findAllCart);

      // When
      const result = await cartService.listUserCarts(1);

      // Then
      expect(result).toEqual(cartServiceFixtures.findAllCart);
    });

    it("Should throw error if not carts exist for given user id", async () => {
      // Given
      mockModels.Cart.findAll = jest.fn().mockResolvedValue([]);
      try {
        // When
        await cartService.listUserCarts(1);
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
        .mockResolvedValue(cartServiceFixtures.listUserCarts);

      // When
      const result = await cartService.listUserCartIds(1);

      // Then
      expect(result).toEqual(cartServiceFixtures.listUserCartIds);
    });
  });
  describe("listCartItems", () => {
    it("Should return undefined if no items in cart", async () => {
      // Given
      mockModels.CartItem.findAll = jest.fn().mockResolvedValue([]);

      // When
      const result = await cartService.listCartItems(1);

      // Then
      expect(result).toEqual(undefined);
    });
    it("Should return items list if they exist in cart", async () => {
      // Given
      mockModels.CartItem.findAll = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findAllCartItem);

      // When
      const result = await cartService.listCartItems(1);
      console.log("RESULTT!!!!! ", result);

      // Then
      expect(result).toEqual(cartServiceFixtures.listCartItem);
    });
  });
  describe("addItem", () => {
    it("Should add an item to cart with enough quantity", async () => {
      // Given
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkItem);
      mockModels.CartItem.findOrCreate = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOrCreateCartItemCeated);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);

      // When
      const result = await cartService.addCartItem(1, 4);

      // Then
      expect(result).toEqual(true);
    });
    it("Should throw error if item stock not enough", async () => {
      // Given
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkItem);
      try {
        // When
        await cartService.addCartItem(
          1,
          4,

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
        await cartService.addCartItem(1, 4, 10);
      } catch (err) {
        // Then
        expect(err.name).toEqual(ResourceNotFoundError.name);
      }
    });
    it("Should increment if item previously added", async () => {
      // Given
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkItem);
      mockModels.CartItem.findOrCreate = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOrCreateCartItemFound);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);
      mockModels.CartItem.increment = jest.fn().mockResolvedValue([[null, 1]]);

      // When
      const result = await cartService.addCartItem(1, 4, 10);
      expect(result).toBe(true);
    });
  });

  describe("updateCartItem", () => {
    it("Should throw for non-existing cartItem ", async () => {
      // Given

      mockModels.CartItem.findOne = jest.fn().mockResolvedValue(null);

      try {
        // When
        await cartService.updateCartItem(1, 4, 10);
      } catch (err) {
        // Then
        expect(err.name).toEqual(ResourceNotFoundError.name);
      }
    });
    it("Should decrease item stock and update cartItem for higher requested quantity", async () => {
      // Given

      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneCartItem);
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkItem);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);
      cartServiceFixtures.findOneCartItem.update = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.updateCartItem);

      try {
        // When
        const result = await cartService.updateCartItem(1, 4, 600);
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
        .mockResolvedValue(cartServiceFixtures.findOneCartItem);
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkItem);
      mockModels.Item.decrement = jest.fn().mockResolvedValue([[null, 1]]);
      cartServiceFixtures.findOneCartItem.update = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.updateCartItem);

      // When
      const result = await cartService.updateCartItem(1, 4, 600);

      // Then
      expect(result).toBe(true);
    });

    it("Should increase item stock and update cartItem for higher requested quantity", async () => {
      // Given
      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneCartItem);
      mockModels.Item.findByPk = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findByPkItem);
      mockModels.Item.increment = jest.fn().mockResolvedValue([[null, 1]]);
      cartServiceFixtures.findOneCartItem.update = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.updateCartItem);

      // When
      const result = await cartService.updateCartItem(1, 4, 400);

      // Then
      expect(result).toBe(true);
    });
  });
  describe("deleteCartItem", () => {
    it("Should delete existing cartItem with valid inputs", async () => {
      // Given
      mockModels.CartItem.findOne = jest
        .fn()
        .mockResolvedValue(cartServiceFixtures.findOneCartItem);
      mockModels.Item.increment = jest.fn().mockResolvedValue([[undefined, 1]]);
      cartServiceFixtures.findOneCartItem.destroy = jest
        .fn()
        .mockResolvedValue(true);

      // When
      const result = await cartService.deleteCartItem(1, 4);

      // Then
      expect(result).toBe(true);
    });
  });
});
