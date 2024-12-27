import express from 'express'
import {auth} from '../../middlewares/jwtauth.js'
import { commentController } from './comments.controller.js';

export const router  = express.Router();

//Get all comments of a post
//pass postId
router.get('/:id',auth,commentController.getAll);
//add a comment to a post
router.post('/',auth,commentController.addNew);
//update a comment 
router.put('/:id',auth,commentController.update);
//delete a comment on post
router.delete('/:id',auth,commentController.deleteComment);


