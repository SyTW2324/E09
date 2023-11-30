import { User } from "../models/user.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const verifyToken = async(req: any, res: any, next: any) => {
    try {
      const authHeader =req.headers.authorization.split(' ')[1];
      console.log(authHeader)
      const decodedUserInfo = jwt.verify(authHeader, process.env.AUTH_TOKEN_KEY!) as JwtPayload;
      const user = await User.find({ email: decodedUserInfo.email, password: decodedUserInfo.password });
      if(!user) {
        throw new Error('Unauthorized');
      }
  
      req.user = {...user, ...decodedUserInfo};
    } catch (error) {
      return res.status(403).send('Unauthorized');
    }
    return next();
  }