const Redis = require("ioredis");
const JSONCache = require("redis-json");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const jsonCache = new JSONCache(redis, { prefix: "cache:" });

module.exports = jsonCache;
