
const mongoose=require('mongoose')
const DataSchema=new mongoose.Schema({

title:{type:String,required:true},
des:{type:String,required:true},
userID:{type:mongoose.Schema.Types.ObjectId,required:true}

},{
    versionKey:false,
    timestamps:true
})

const BlogModel=mongoose.model('blogs',DataSchema)
module.exports={BlogModel}