import express from 'express'
import { postController } from './post.Controller.js';
import multer from 'multer'
import {auth} from '../../middlewares/jwtauth.js'
const upload = multer();

export const router = express.Router();

router.post('/create',upload.single('image'),auth,postController.createNew);
router.post('/update/:id',upload.single('image'),auth,postController.updatePost);

router.delete('/:id',auth,postController.deletePost);


