const mongoose=require('mongoose')
const { BlogModel } = require("../model/BlogModel");

const objectID=mongoose.Types.ObjectId;

 const createBlogService=async(req)=>{
   try{
const user_id=req.headers['user_id']
const reqBody=req.body;
reqBody.userID=user_id
let data=await BlogModel.create(reqBody)

return {status:true,message:'Blog Added ',data:data}

} catch(err){
    return {status:false,message:'Error occured',data:err.toString()}
   }
 }

 const readBlogService=async(req)=>{
    try{
  const user_id= new objectID(req.headers['user_id'])
  
  let matchStage={$match:{userID:user_id}}
  let joinwithuser={$lookup:{from:'users',foreignField:'_id',localField:'userID',as:'details'}}
  let unwindstage={$unwind:'$details'}
  let projection={$project:{
    "userID":0,
    "createdAt":0,
    "updatedAt":0,
     "details._id":0,
      "details.otp":0,
      "details.updatedAt":0,
      "details.createdAt":0

  }}
  let data=await BlogModel.aggregate([matchStage,joinwithuser,unwindstage,projection])
 return{status:true,message:'commnet with user detials',data:data}
   } catch(err){
    return {status:false,message:'Error occured',data:err.toString()}
   }
 }

 const updateBlogService=async(req)=>{
try{
  const user_id=new objectID(req.headers['user_id'])
  const reqBody=req.body;
 let query={_id:reqBody.blogID,userID:user_id}
  await BlogModel.updateOne(query,reqBody)
 return {status:true,message:'Blog updated Succesfully'}
} catch(err){
    return {status:false,message:'Error occured',data:err.toString()}
   }

 }

 const deleteBlogService=async(req)=>{
   try{
 let user_id=new objectID(req.headers['user_id'])
 const reqBody=req.body;
 let query={_id:reqBody.blogID,userID:user_id}
await BlogModel.deleteOne(query)
return {status:true,message:'Blog deleted Sucessfully'}
   } catch(err){
    return {status:false,message:'Error occured',data:err.toString()}
   }

 }

module.exports={createBlogService,readBlogService,updateBlogService,deleteBlogService}