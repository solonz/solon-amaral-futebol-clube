import { Router } from 'express';
import loginRoutes from './loginRoutes';
import teamsRoutes from './teamsRoutes';

const router = Router();

router.use('/login', loginRoutes);
router.use('/teams', teamsRoutes);

export default router;
