const express=require('express')
const {createUser,getUser, loginUser}=require('../controllers/userControllers')
const router=express.Router();

router.route('/').get(getUser)
router.route('/register').post(createUser);
router.route('/login').post(loginUser)



module.exports=router;