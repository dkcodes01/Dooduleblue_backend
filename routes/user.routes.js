const express=require('express')
const router=express.Router();
const auth = require('../middleware/auth.middleware')
const UserController=require('../controllers/user.controller');

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.get('/getall',auth,UserController.getAllUsers)
router.delete('/delete/:id',UserController.softDelete)
router.patch('/patch/:id',UserController.update)
router.post('/addprofile',auth,UserController.adduserProfile)
module.exports=router