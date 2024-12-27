import express from 'express'
import { FriendController } from './friend.controller.js';
import { auth } from '../../middlewares/jwtauth.js';

export const router = express.Router();

router.post('/:id',auth,FriendController.sendFriendRequest);
router.post('/accept/:id',auth,FriendController.acceptRequest);