const { StatusCodes } = require("http-status-codes");

class BaseError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(resource, statusCode = StatusCodes.NOT_FOUND) {
    super(`${resource} not found`, statusCode);
    this.name = this.constructor.name;
  }
}

class ItemError extends BaseError {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
    this.name = this.constructor.name;
  }
}
class CartError extends BaseError {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
    this.name = this.constructor.name;
  }
}

class UnAuthorizedUser extends BaseError {
  constructor(message = "FORBIDDEN", statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
    this.name = this.constructor.name;
  }
}

module.exports = {
  ResourceNotFoundError: ResourceNotFoundError,
  BaseError: BaseError,
  ItemError: ItemError,
  CartError: CartError,
  UnAuthorizedUser: UnAuthorizedUser,
};
