// import { Request, Response } from 'express';
// import LoginService from '../Services/loginService';

// class LoginController {
//   public loginService = new LoginService();
//   async login(req: Request, res: Response) {
//     const data = await this.loginService.login(req.body);

//     return res.status(data?.status).json(data?.message);
//   }
// }

// export default LoginController;

import { Request, Response } from 'express';
import LoginService from '../Services/loginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    console.log(req.body);
    const token = await LoginService.login(req.body);
    res.status(200).json(token);
  }
}
