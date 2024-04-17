import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authenticateUserJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.cookies.userAccessToken;
    if (token) {
      jwt.verify(token, process.env.USER_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
          res.status(403).json({ message: 'Invalid token' });
        } else {
          req.decodedUser = decoded as decodedUser;
          next();
        }
      });
    } else {
      res.status(403).json({ message: 'No token provided' });
    }
  } catch (error: any) {
    console.log(error);
  }
}
