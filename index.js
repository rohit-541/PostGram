//Modules import
import express from 'express'
import {router as userRouter} from './Features/user/user.routes.js'
import bodyParser from 'body-parser';
import { AppLevelError } from './Error/customErrorClass.js';
import {router as friendRouter} from './Features/Friends/routes.js'
import {router as postRouter} from './Features/Post/post.Routes.js'

import {router as likeRouter} from './Features/Likes/likes.routes.js'
import {router as commentRouter} from './Features/comment/comments.routes.js'

const app = express();
app.use(bodyParser.json());

app.use('/user',userRouter);
app.use('/friend',friendRouter);
app.use('/post',postRouter);
app.use('/like',likeRouter);
app.use('/comment',commentRouter);

app.use(AppLevelError);
export default app;