const Redis = require("ioredis");
const JSONCache = require("redis-json");
const redisConfig = require("../config/redis.config");

const redis = new Redis(redisConfig);
const jsonCache = new JSONCache(redis, { prefix: "cache:" });

module.exports = jsonCache;
