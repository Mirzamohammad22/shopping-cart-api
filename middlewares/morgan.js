const morgan = require("morgan");
const logger = require("../utils/logger");

// Use custom logger instead of the console.log
const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

// Skip Morgan if it is not development mode
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  // Message format string (this is the default one).
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = morganMiddleware;
