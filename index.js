//Modules import
import express from 'express'
import {router as userRouter} from './Features/user/user.routes.js'
import bodyParser from 'body-parser';
import { AppLevelError } from './Error/customErrorClass.js';

const app = express();
app.use(bodyParser.json());

app.use('/user',userRouter);

app.use(AppLevelError);
export default app;