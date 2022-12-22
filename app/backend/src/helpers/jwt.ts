import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces';

export default class JWT {
  static generateToken(login: ILogin): string {
    return jwt.sign(login, process.env.JWT_SECRET as string);
  }
}
