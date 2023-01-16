import { Router } from 'express';
import LeaderboardController from '../Controllers/leaderboardController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/home', LeaderboardController.homeLeaderboard);
leaderboardRoutes.get('/away', LeaderboardController.awayLeaderboard);

export default leaderboardRoutes;
