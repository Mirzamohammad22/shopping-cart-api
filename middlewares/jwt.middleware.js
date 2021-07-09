const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

// TODO: For development purposes,remove default after env injection
const jwtSecret = process.env.JWT_SECRET || "secretkey";

async function authenticateJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      logger.debug(`Auth Header token:${token}`);
      const authData = await jwt.verify(token, jwtSecret);
      logger.debug(`Auth token data:${JSON.stringify(authData)}`);
      req.authData = authData;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      return res.status(401).json({
        error: err.message,
      });
    }
    next(err);
  }
}

module.exports = authenticateJwt;
