const { UserModel } = require("../model/UserModel");
const { EmailSend } = require("../utils/Email_helper");
const { EncodeToken } = require("../utils/Token_helper");



const UserRegisterService=async(req)=>{
try{

    const {FirstName,LastName}=req.body;
let email=req.params.email;
let code= Math.floor(100000 + Math.random() * 900000);
let mailtext=`Your Verification code ${code}`
let mailSub='Email Verification';
  await EmailSend(email,mailtext,mailSub);
const data=await UserModel.updateOne(
    {email:email},
    {$set:{otp:code,FirstName: FirstName, LastName: LastName}},
)
return{status:'true',message:'Register Success',data:data}
}catch(err){
    return{status:'fail',data:err.toString()}
}
}




const UserVerifyService=async(req,res)=>{
try{
let email=req.params.email;
let otp=req.params.otp;

let total=await UserModel.find({
    email:email,
    otp:otp
}).countDocuments();

if(total==1){
    let user_id=await UserModel.find({
        email:email,
        otp:otp
    }).select("_id");
 
   
    let token= await EncodeToken(email,user_id[0]["_id"].toString());
    await UserModel.updateOne({email:email},{$set:{otp:"0"}});
    //Now set the token to the cookies

   const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    }

res.cookie("Token",token,cookieOptions)
    

    return {status:"success" ,message:'User Verify Successfully'}
}else{
    return {status:'Failed',message:'User not Verify'}
}

}catch(err){
    return{status:'fail',data:err.toString()}
}
}

const UserLogoutService=async(req,res)=>{
    try{
  
        const cookieOptions={
 
            expires:new Date(Date.now()- 24*60*60*1000),
            httpOnly:false
        };
        res.cookie('Token'," ",cookieOptions)
        res.status(200).json({message:'User Logout Successs'})
         
}catch(err){
    res.status(500).json({message:'Error occured'})
}

}

module.exports={UserRegisterService,UserVerifyService,UserLogoutService}