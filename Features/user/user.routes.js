//Import all Modules here
import express from 'express'
import multer from 'multer'

import {validateUserDetails} from '../../middlewares/validators/user.validation.js'
import { userController } from './user.controller.js';
import {validateLogin} from '../../middlewares/validators/loginValidation.js'
import { auth } from '../../middlewares/jwtauth.js';

//create a router
export const router = express.Router();

//an upload enginer of multer
const upload = multer();

//All get request
router.get('/',auth,userController.getDetail);



//All Post Request
router.post('/register',upload.any(),validateUserDetails,(req,res,next)=>{
    userController.registerUser(req,res);
});  

router.post('/login',validateLogin,userController.loginUser);

router.post('/update',upload.single('image'),auth,userController.update);