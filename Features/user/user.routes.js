import express from 'express'
import multer from 'multer'

import {validateUserDetails} from '../../middlewares/user.validation.js'
import { userController } from './user.controller.js';

export const router = express.Router();

const upload = multer();
//All Post Request
router.post('/register',upload.any(),validateUserDetails,(req,res,next)=>{
    userController.registerUser(req,res);
});  