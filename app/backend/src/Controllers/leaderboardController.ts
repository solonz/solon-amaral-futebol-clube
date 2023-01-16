import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import LeaderboardService from '../Services/leaderboardService';
import MatchesService from '../Services/matchesService';

export default class LeaderboardController {
  static async homeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const matches = await MatchesService.allMatches();
    const data = await LeaderboardService.buildLeaderboard(matches, 'home');
    data.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
    return res.status(httpStatus.success).json(data);
  }

  static async awayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const matches = await MatchesService.allMatches();
    const data = await LeaderboardService.buildLeaderboard(matches, 'away');
    data.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
    return res.status(httpStatus.success).json(data);
  }
}
