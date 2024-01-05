const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: 'Too many requests from this IP, please try again in 60 seconds.',
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: 'Too many search requests from this IP, please try again in 60 seconds.',
})


module.exports = { limiter, searchLimiter};
