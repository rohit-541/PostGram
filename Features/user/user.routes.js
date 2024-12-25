//Import all Modules here
import express from 'express'
import multer from 'multer'

import {validateUserDetails} from '../../middlewares/validators/user.validation.js'
import { userController } from './user.controller.js';
import {validateLogin} from '../../middlewares/validators/loginValidation.js'
import { auth } from '../../middlewares/jwtauth.js';
import { validatepasswordupdate } from '../../middlewares/validators/passwordUpdate.js';

//create a router
export const router = express.Router();

//an upload enginer of multer
const upload = multer();

//All get request
router.get('/',auth,userController.getDetail);
router.get('/getOTP',userController.sendOTP);
//All Post Request
router.post('/register',upload.single('image'),validateUserDetails,(req,res,next)=>{
    userController.registerUser(req,res,next);
});  
router.post('/login',validateLogin,userController.loginUser);
router.post('/update',upload.single('image'),auth,userController.update);
router.post('/logout',auth,userController.logout);
router.post('/logout-all',auth,userController.logout_all);
router.post('/password-reset',validatepasswordupdate,userController.updatePassword);
