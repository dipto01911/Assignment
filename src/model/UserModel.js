

const mongoose=require('mongoose')
 
 const DataSchema=new mongoose.Schema({
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
  email:{type:String,unique:true,required:true,lowercase:true},
  otp:{type:String}
 },{
     versionKey:false,
     timestamps:true
 })
 
 const UserModel=mongoose.model('users',DataSchema)
 module.exports={UserModel}