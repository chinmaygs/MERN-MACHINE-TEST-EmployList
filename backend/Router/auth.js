const express=require("express")
const authController=require('../Controller/auth.js')

const router=express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/logout',authController.logout);

exports.router=router