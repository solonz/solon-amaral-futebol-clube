import { Router } from 'express';
import loginRoutes from './loginRoutes';
import teamsRoutes from './teamsRoutes';
import matchesRoutes from './matchesRoutes';
import leaderboardRoutes from './leaderboardRoutes';

const router = Router();

router.use('/login', loginRoutes);
router.use('/teams', teamsRoutes);
router.use('/matches', matchesRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
