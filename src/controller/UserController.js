const {UserRegisterService,UserVerifyService,UserLogoutService}=require('../services/UserServices')


const UserRegister=async(req,res)=>{
 
    const result=await UserRegisterService(req)
    return res.status(200).json(result)
}

const UserVerify=async(req,res)=>{
 const result = await UserVerifyService(req,res)
 return res.status(200).json(result)
}

const UserLogout=async(req,res)=>{
    const result=await UserLogoutService(req,res)
return res.status(200).json(result)
}

module.exports={UserRegister,UserVerify,UserLogout}