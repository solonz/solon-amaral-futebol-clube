import { Router } from 'express';
import LeaderboardController from '../Controllers/leaderboardController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/home', LeaderboardController.homeLeaderboard);
leaderboardRoutes.get('/away', LeaderboardController.awayLeaderboard);
leaderboardRoutes.get('/', (req, res) => LeaderboardController.allLeaderboard(req, res));

export default leaderboardRoutes;
