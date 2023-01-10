import { Router } from 'express';
import LoginController from '../Controllers/loginController';

const loginRoutes = Router();

loginRoutes.post('/', LoginController.login);
loginRoutes.get('/validate', LoginController.loginValidate);

export default loginRoutes;
