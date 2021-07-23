const { validationResult, matchedData } = require("express-validator");
const { InputValidationError } = require("../../utils/errors/index");
const logger = require("../../utils/logger");

function validateSchema(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InputValidationError("Invalid input", errors.array());
    }

    // Get cleaned request data
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
     * This way client wont break their head on why something is not working as they expected.
     */
    if (
      extraBodyKeys.length > 0 ||
      extraParamKeys.length > 0 ||
      extraQueryKeys.length > 0
    ) {
      const extraKeys = [];
      extraKeys.push(
        ...extraQueryKeys.map((key) => {
          return { key: key, location: "query" };
        })
      );
      extraKeys.push(
        ...extraParamKeys.map((key) => {
          return { key: key, location: "params" };
        })
      );
      extraKeys.push(
        ...extraBodyKeys.map((key) => {
          return { key: key, location: "body" };
        })
      );
      throw new InputValidationError("Unexpected keys passed in the request", {
        unexpectedKeys: extraKeys,
      });
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
