//Modules import
import express from 'express'
import {router as userRouter} from './Features/user/user.routes.js'
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.use('/user',userRouter);

export default app;