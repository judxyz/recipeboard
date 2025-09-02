import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {

    try {
        // key based on userid (for authentication) or ip address
        const {success} = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({message: "Too many requests, please try again later"});
        }
        next(); // next middleware or route handler
    } catch (error) {
        console.log("Rate limit error", error)
        next(error); // pass on error to express
    }
}

export default rateLimiter;
