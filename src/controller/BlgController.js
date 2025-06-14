const { createBlogService, readBlogService, updateBlogService, deleteBlogService } = require("../services/BlogServices")


const createBlog=async(req,res)=>{
    let result=await createBlogService(req)
    return res.status(200).json(result)
}

const readBlog=async(req,res)=>{
    let result=await readBlogService(req)
    return res.status(200).json(result)
}

const updateBlog=async(req,res)=>{
    let result=await updateBlogService(req)
    return res.status(200).json(result)
}

const deleteBlog=async(req,res)=>{
    let result =  await deleteBlogService(req)
    return res.status(200).json(result)
}

module.exports={createBlog,readBlog,updateBlog,deleteBlog}