const { validationResult, matchedData } = require("express-validator");
const logger = require("../../../utils/logger");

function validateSchema(req, res, next) {
  try {
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

    // Getting unexpected keys being passed along with the request
    const extraBodyKeys = Object.keys(req.body).filter(
      (x) => !Object.keys(cleanedBody).includes(x)
    );
    const extraParamKeys = Object.keys(req.params).filter(
      (x) => !Object.keys(cleanedParams).includes(x)
    );
    const extraQueryKeys = Object.keys(req.query).filter(
      (x) => !Object.keys(cleanedQuery).includes(x)
    );

    /**
     * If any unexpected keys exists, we want to notify client instead of ignoring it.
     * This way client wont break his head on why something is not working as expected.
     */
    if (
      extraBodyKeys.length > 0 ||
      extraParamKeys.length > 0 ||
      extraQueryKeys.length > 0
    ) {
      const errorObject = {
        message: "Unexpected Keys passed in the Request",
        error: {
          ...(extraBodyKeys.length > 0 ? { body: extraBodyKeys } : undefined),
          ...(extraParamKeys.length > 0 ? { params: extraParamKeys } : undefined),
          ...(extraQueryKeys.length > 0 ? { query: extraQueryKeys } : undefined),
        },
      };
      return res.status(400).json(errorObject);
    }

    // replacing request with cleaned and sanitized data.
    req.body = cleanedBody;
    req.params = cleanedParams;
    req.query = cleanedQuery;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateSchema;
