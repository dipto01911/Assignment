
const router=require('express').Router();

const { createBlog, readBlog, updateBlog, deleteBlog } = require('../controller/BlgController');
const{UserRegister,UserVerify,UserLogout}=require('../controller/UserController');
const { AuthVerify } = require('../middleware/Auth');


router.post('/userRegister/:email',UserRegister)
router.get('/userVerify/:email/:otp',UserVerify)
router.get('/userLogout',UserLogout)

//Blog api

router.post('/createBlog',AuthVerify,createBlog)
router.get('/readBlog',AuthVerify,readBlog)
router.patch('/updateBlog',AuthVerify,updateBlog)
router.delete('/deleteBlog',AuthVerify,deleteBlog)


module.exports=router