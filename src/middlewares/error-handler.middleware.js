const logger = require("../utils/logger");
const { StatusCodes } = require("http-status-codes");
module.exports = function errorHandler (err, req, res, next) {
  if (
    err.statusCode === undefined ||
    err.statusCode === StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    logger.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: "Internal Server Error",
      },
    });
  } else {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }
};
