// import { compareSync } from 'bcryptjs';
import { Op } from 'sequelize';
import CustomErrors from '../handlers/customErrors';
import { ILogin, IUser } from '../interfaces';
import Users from '../database/models/usersModel';
import JWT from '../helpers/jwt';

export default class LoginService {
  static validateLogin(login: ILogin, user: IUser) {
    console.log('chamando validação de dados');

    if (login.email !== user.email || login.password !== user.password) {
      throw new CustomErrors(401, 'Incorrect email or password');
    }
  }

  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#examples-with-opand-and-opor
  static async login(login: ILogin): Promise<string> {
    const userExists = await Users
      .findOne({ where: { [Op.or]: [{ email: login.email }, { password: login.password }] } });
    if (userExists) {
      console.log('Usuário existe');
      this.validateLogin(login, userExists);
    }
    const token = await JWT.generateToken(login);
    console.log('token gerado');
    console.log(token);
    return token;
  }
}
