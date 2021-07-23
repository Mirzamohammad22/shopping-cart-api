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

class UserError extends BaseError {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
    this.name = this.constructor.name;
  }
}

class AuthorizationError extends BaseError {
  constructor(message = "Forbidden", statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
    this.name = this.constructor.name;
  }
}
class LoginError extends BaseError {
  constructor(message, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
    this.name = this.constructor.name;
  }
}

class InputValidationError extends BaseError {
  constructor(
    message,
    details = undefined,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
    this.name = this.constructor.name;
    this.details = details;
  }
}

module.exports = {
  ResourceNotFoundError: ResourceNotFoundError,
  BaseError: BaseError,
  ItemError: ItemError,
  CartError: CartError,
  UserError: UserError,
  LoginError: LoginError,
  AuthorizationError,
  InputValidationError: InputValidationError,
};
