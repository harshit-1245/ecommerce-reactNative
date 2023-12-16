const express=require('express')
const {createUser,getUser, loginUser,verifying,saveAddress,getAdrress}=require('../controllers/userControllers')
const router=express.Router();

router.route('/').get(getUser)
router.route('/verify/:token').get(verifying)
router.route('/register').post(createUser);
router.route('/login').post(loginUser)
router.route('/addresses').post(saveAddress)
router.route('/addresses/:userId').get(getAdrress)



module.exports=router;