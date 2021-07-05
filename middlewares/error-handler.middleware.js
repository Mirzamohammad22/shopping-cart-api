const logger = require("../utils/logger");

module.exports = errorHandler = (err, req, res, next) => {
  if (err.statusCode === undefined || err.statusCode === 500) {
    logger.error(err);
    res.status(500).send();
  } else {
    res.status(err.statusCode).json({
      error: err.message,
    });
  }
}
