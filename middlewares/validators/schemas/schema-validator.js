const { validationResult, matchedData } = require("express-validator");
const logger = require("../../../utils/logger");

async function validateSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Pruning out of any unexpected data, request should contain only expected data.
  req.body = matchedData(req, { includeOptionals: false, locations: ["body"] });

  logger.debug(`ValidatedRequestBody:${JSON.stringify(req.body)}`);
  next();
}

module.exports = validateSchema;
