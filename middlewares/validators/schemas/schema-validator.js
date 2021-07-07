const { validationResult, matchedData } = require("express-validator");
const logger = require("../../../utils/logger");

async function validateSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // get cleaned request data
  const cleanedBody = matchedData(req, {
    includeOptionals: false,
    locations: ["body"],
  });
  const cleanedParams = matchedData(req, {
    includeOptionals: false,
    locations: ["params"],
  });
  const cleanedQuery = matchedData(req, {
    includeOptionals: false,
    locations: ["query"],
  });

  logger.debug(
    `RawRequestQuery:${JSON.stringify(req.query)}
     \n 
     ValidatedRequestQuery:${JSON.stringify(cleanedQuery)}`
  );
  logger.debug(
    `RawRequestParams:${JSON.stringify(req.params)} 
    \n 
    ValidatedRequestParams:${JSON.stringify(cleanedParams)}`
  );
  logger.debug(
    `RawRequestBody:${JSON.stringify(req.body)} 
    \n 
    ValidatedRequestBody:${JSON.stringify(cleanedBody)}`
  );

  // cleaning out of any unexpected data, request should contain only expected data.
  req.body = cleanedBody;
  req.params = cleanedParams;
  req.query = cleanedQuery;

  next();
}

module.exports = validateSchema;
