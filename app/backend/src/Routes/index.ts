import { Router } from 'express';
import loginRoutes from './loginRoutes';
import teamsRoutes from './teamsRoutes';
import matchesRoutes from './matchesRoutes';

const router = Router();

router.use('/login', loginRoutes);
router.use('/teams', teamsRoutes);
router.use('/matches', matchesRoutes);

export default router;
