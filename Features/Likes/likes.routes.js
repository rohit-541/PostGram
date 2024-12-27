import express from 'express'
import {auth} from '../../middlewares/jwtauth.js'
import { likeController } from './likes.controller.js';
export const router = express.Router();

//Like a post
router.post('/like',auth,likeController.likePost);
//Dislike a post
router.post('/dislike',auth,likeController.dislikePost);
//neutralize a post
router.post('/neutralize',auth,likeController.neutralizePost);

//get likescount of post
router.get('/likeCount',auth,likeController.likeCount);
