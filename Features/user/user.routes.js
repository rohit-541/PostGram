//Import all Modules here
import express from 'express'
import multer from 'multer'

import {validateUserDetails} from '../../middlewares/validators/user.validation.js'
import { userController } from './user.controller.js';
import {validateLogin} from '../../middlewares/validators/loginValidation.js'

//create a router
export const router = express.Router();

//an upload enginer of multer
const upload = multer();


//All Post Request
router.post('/register',upload.any(),validateUserDetails,(req,res,next)=>{
    userController.registerUser(req,res);
});  

router.post('/login',validateLogin,userController.loginUser);