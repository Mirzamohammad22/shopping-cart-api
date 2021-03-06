const ItemService = require("../../src/services/item.service");

const { Sequelize } = require("sequelize");
const { makeMockModels } = require("sequelize-jest-helpers");
const { ResourceNotFoundError } = require("../../src/utils/errors/index");
const itemServiceFixtures = require("./fixtures/item.service.fixture");

const mockModels = makeMockModels({ Item: { findAndCountAll: undefined } });

const itemService = new ItemService(mockModels.Item);

describe("ItemService", () => {
  describe("listItems", () => {
    it("Should reject if model throws error", async () => {
      // Given
      const error = new Sequelize.SequelizeScopeError("No result");
      mockModels.Item.findAndCountAll = jest.fn().mockRejectedValue(error);
      try {
        // when
        await itemService.listItems();
      } catch (err) {
        // then
        expect(err.name).toEqual(error.name);
      }
    });
    it("Should return resolved data with valid model data", async () => {
      // Given
      mockModels.Item.findAndCountAll = jest
        .fn()
        .mockResolvedValue(itemServiceFixtures.findAndCountAllItem);

      // When
      const result = await itemService.listItems();

      // Then
      expect(result).toEqual(itemServiceFixtures.listItemsData);
    });
    it("Should reject if no data exists", async () => {
      // Given
      mockModels.Item.findAndCountAll = jest
        .fn()
        .mockResolvedValue(itemServiceFixtures.findAndCountAllItemEmptyMatch);
      try {
        // When
        await itemService.listItems();
      } catch (err) {
        // Then
        expect(err.name).toBe(ResourceNotFoundError.name);
      }
    });
  });
});
