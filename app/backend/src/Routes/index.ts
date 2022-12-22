import { Router } from 'express';
import routerLogin from './loginRoutes';

const router = Router();

router.use('/login', routerLogin);

export default router;
