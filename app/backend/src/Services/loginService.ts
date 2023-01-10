import * as bcrypt from 'bcryptjs';
import Users from '../database/models/usersModel';
import { ILogin, IToken } from '../interfaces';
import JWT from '../helpers/jwt';

export default class LoginService {
  static async login(body: ILogin): Promise<IToken | undefined> {
    const { email, password } = body;

    const userData = await Users
      .findOne({ where: { email } });

    if (!userData) return;

    if (!bcrypt.compareSync(password, userData.password)) return;

    const token = await JWT.generateToken(email);
    console.log('token gerado');
    return { token };
  }

  static async validateToken(authorization: string) {
    const hasAuthorization = JWT.validateToken(authorization);
    console.log(hasAuthorization);

    if (!hasAuthorization) return { role: undefined };
    const user = await Users.findOne({ where: { email: hasAuthorization } });
    console.log(user);

    return { role: user?.role };
  }
}
