import jwt from 'jsonwebtoken';
import { userPayload } from 'common';

export function generateUserJWT(userPayload: userPayload): string {
  return jwt.sign(userPayload, process.env.USER_TOKEN_SECRET!, {
    expiresIn: '2d',
    algorithm: 'HS256',
  });
}
