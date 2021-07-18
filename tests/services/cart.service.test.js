const UserService = require("../../services/user.service");
const {
  UniqueConstraintError,
  ForeignKeyConstraintError,
} = require("sequelize");
const { makeMockModels } = require("sequelize-jest-helpers");
const {
  ResourceNotFoundError,
  UserError,
  LoginError,
} = require("../../utils/errors/index");
const cartServiceFixtures = require("./fixtures/cart.service.fixture");
const CartService = require("../../services/cart.service");
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
    },
    CartItem: {
      findAll: undefined,
      findByPk: undefined,
      findOrCreate: undefined,
      findOne: undefined,
    },
  },
  "models",
  ".js"
);

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
          .mockResolvedValue(cartServiceFixtures.findAllResolvedValueCart);

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

      // When
      const result = await cartService.addItem(4, 100);

      // Then
      expect(result).toEqual(true);
    });
  });
});
