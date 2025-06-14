const { DecodeToken } = require("../utils/Token_helper")


const AuthVerify=async(req,res,next)=>{
    let token = req.headers['Token']

    if(!token){
        token=req.cookies['Token']
    }
    let decoded= await DecodeToken(token)

    if(decoded === null){
        return res.status(401).json({message:'Unauthorized Access'})
    }else{
        let email=decoded['email']
        let user_id=decoded['user_id']
     
        req.headers.email=email;
        req.headers.user_id=user_id;
        next();
    }
}

module.exports={AuthVerify}