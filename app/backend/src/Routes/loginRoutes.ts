import { Router } from 'express';
import LoginController from '../Controllers/loginController';

const loginRoutes = Router();

loginRoutes.get('/validate', LoginController.loginValidate);
loginRoutes.post('/', LoginController.login);

export default loginRoutes;
