import * as jwt from 'jsonwebtoken';

export default class JWT {
  static generateToken(email: string) {
    return jwt.sign(email, process.env.JWT_SECRET as string);
  }

  static validateToken(authorization: string) {
    try {
      return jwt.verify(authorization, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    } catch (error) {
      return ('Expired or invalid token');
      // throw new Error('Expired or invalid token');
    }
  }
}
