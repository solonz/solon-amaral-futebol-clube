import { Router } from 'express';
import FieldsValidation from '../middlewares/validateLogin';
import LoginController from '../Controllers/loginController';

const routerLogin = Router();

routerLogin.post('/', FieldsValidation.validateLogin, LoginController.login);

export default routerLogin;
