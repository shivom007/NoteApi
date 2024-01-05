const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const bearerToken = req.header('Authorization')

  if (!bearerToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized - Missing token' });
  }

  if(bearerToken === undefined){
    return res.status(401).json({ success: false, message: 'Unauthorized - Missing token' });
  }

  try {
    const token = bearerToken.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');


    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
  }
};

module.exports = { authenticate };
