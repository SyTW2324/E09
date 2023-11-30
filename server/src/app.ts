import express from 'express';
import './db/mongoose.js';
import { defaultRouter } from './routers/default.js';
import { userRouter } from './routers/user.js';
import { populate } from 'dotenv';
import cors from 'cors';


export const app = express();
app.use(express.json());

// cors
app.use(cors({
    origin: 'http://localhost:3000', // NOTE: Specify the origin
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,DELETE,OPTIONS",
    credentials: true
}));

app.use(userRouter);
app.use(defaultRouter);
