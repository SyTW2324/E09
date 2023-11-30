import express from 'express';
import './db/mongoose.js';
import { defaultRouter } from './routers/default.js';
import { userRouter } from './routers/user.js';
import { populate } from 'dotenv';
import cors from 'cors';


export const app = express();
app.use(express.json());

app.use(userRouter);
app.use(defaultRouter);

// cors
app.use('/', cors({
    origin: true, // NOTE: Allowing all origins for now
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,OPTIONS",
    credentials: true
  }));
