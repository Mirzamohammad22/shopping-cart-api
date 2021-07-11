const logger = require("../utils/logger");

module.exports = errorHandler = (err, req, res, next) => {
  if (err.statusCode === undefined || err.statusCode === 500) {
    logger.error(err);
    return res.status(500).send();
  } else {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }
};
