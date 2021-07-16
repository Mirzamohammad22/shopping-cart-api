const jsonCache = require("../utils/cache")
const {StatusCodes} = require('http-status-codes')

async function cacheMiddleware(req,res,next){
    try{
        const cacheResult = await jsonCache.get(req.originalUrl)
        if(cacheResult){
            return res.status(StatusCodes.OK).json(cacheResult)
        }
        next();
    }catch(err){
        next(err)
    }
    
}
module.exports = cacheMiddleware