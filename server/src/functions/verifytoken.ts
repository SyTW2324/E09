import { User } from "../models/user.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const verifyToken = async(req: any, res: any, next: any) => {
    try {
      const authHeader =req.headers.authorization.split(' ')[1];
      const decodedUserInfo = jwt.verify(authHeader, process.env.AUTH_TOKEN_KEY!) as JwtPayload;
      const user = await User.find({ email: decodedUserInfo.email, password: decodedUserInfo.password });
      if(!user) {
        throw new Error('Unauthorized');
      }
  
      req.body.loggedUser = {...decodedUserInfo};
    } catch (error) {
      return res.status(403).send('El usuario no está loggeado o se agotó el tiempo de su sesión');
    }
    return next();
  }