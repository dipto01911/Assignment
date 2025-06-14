
const jwt=require('jsonwebtoken')
const { JWT_KEY, JWT_TIME } = require('../../config')

const EncodeToken=async(email,user_id)=>{
    let payload={email:email,user_id:user_id}
    return jwt.sign(payload,JWT_KEY,{expiresIn:JWT_TIME})
}

const DecodeToken=async(token)=>{
    try{
  return jwt.verify(token,JWT_KEY)
    }catch(err){
        return null;
    }
}

module.exports={EncodeToken,DecodeToken}