const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
let data = dotenv.config();
function Auth(req,res,next){
    const token = req.header('auth-token')

    if(!token){
        return res.status(401).json({
            message:'access denied'
        })
    }

    try{
      console.log("====>",process.env.JWT_SECRET);
      const verified = jwt.verify(token,process.env.JWT_SECRET)
      req.user = verified
      next()
    }catch(err){
      res.status(400).json({
          message:'invalid credentials'
      })
    }
}

module.exports = Auth;