const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const { AuthorizationError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-codes");

const jwtSecret = process.env.JWT_SECRET;

async function authenticateJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthorizationError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    logger.debug(`Auth Header token:${token}`);
    const authData = await jwt.verify(token, jwtSecret);
    logger.debug(`Auth token data:${JSON.stringify(authData)}`);
    req.authData = authData;
    next();
  } catch (err) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      err.statusCode = 401;
    }
    next(err);
  }
}

module.exports = authenticateJwt;
