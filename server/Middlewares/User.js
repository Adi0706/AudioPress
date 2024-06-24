const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;

const verifytoken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token not found" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret_key);
    req.user = decoded; // use this decoded value from token to verify
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};



module.exports = {
  verifytoken,
  
};
