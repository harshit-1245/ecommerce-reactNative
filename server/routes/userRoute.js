const express=require('express')
const {createUser,getUser, loginUser,verifying,saveAddress,getAdrress,storeOrder,getProfile,getOrders}=require('../controllers/userControllers')
const router=express.Router();

router.route('/').get(getUser)
router.route('/verify/:token').get(verifying)
router.route('/register').post(createUser);
router.route('/login').post(loginUser)
router.route('/addresses').post(saveAddress)
router.route('/address/:userId').get(getAdrress)
router.route('/orders').post(storeOrder)
router.route("/profile/:userId").get(getProfile)
router.route("/orders/:userId").get(getOrders)

module.exports=router;