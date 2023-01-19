import { Router } from 'express';
import LeaderboardController from '../Controllers/leaderboardController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/', (req, res) => LeaderboardController.allLeaderboard(req, res));
leaderboardRoutes.get('/home', (req, res) => LeaderboardController.homeLeaderboard(req, res));
leaderboardRoutes.get('/away', (req, res) => LeaderboardController.awayLeaderboard(req, res));

export default leaderboardRoutes;
