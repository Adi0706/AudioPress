const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const mongo_jwt_key=process.env.JWT_MONGO_KEY;

//verify for sql user auth
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
//verify for mongodb profile picture 
// const  verifyMongoToken=(req,res,next)=>{

//   const mongotoken = req.cookies.mongotoken ; 

//   if(!token){
//     return res.status(401).json({error:"Unauthorised transaction , token not found  !"}) ; 
//   }
//   try{
//     const decoded = jwt.verify(mongotoken,mongo_jwt_key) ; 
//     req.mongouser = decoded ; 
//     next() ; 
//   }catch(err){
//     return res.status(401).json({error:"Unauthorised transaction,invalid token  !"}) ;
//   }
// }


module.exports = {
  verifytoken,
  
  
};