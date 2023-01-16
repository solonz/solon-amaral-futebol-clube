import { ILeaderboard, IMatch } from '../interfaces';
import LeaderboardFunctions from '../helpers/leaderboardFuncions';

export default class LeaderboardService {
  static async buildLeaderboard(allMatches: IMatch[], homeOrAway: string) {
    const boardClassification: ILeaderboard[] = [];

    await Promise.all(allMatches.map(async (match) => {
      const leaderboard = {
        name: await LeaderboardFunctions.namme(match, homeOrAway),
        totalPoints: await LeaderboardFunctions.totalPoints(match, homeOrAway),
        totalGames: (await LeaderboardFunctions.totalGames(match, homeOrAway)).length,
        totalVictories: await LeaderboardFunctions.totalVictories(match, homeOrAway),
        totalDraws: await LeaderboardFunctions.totalDraws(match, homeOrAway),
        totalLosses: await LeaderboardFunctions.totalLosses(match, homeOrAway),
        goalsFavor: await LeaderboardFunctions.goalsFavor(match, homeOrAway),
        goalsOwn: await LeaderboardFunctions.goalsOwn(match, homeOrAway),
        goalsBalance: await LeaderboardFunctions.goalsBalance(match, homeOrAway),
        efficiency: await LeaderboardFunctions.efficiency(match, homeOrAway),
      };

      boardClassification.push(leaderboard as ILeaderboard);
    }));

    return this.finalBoard(boardClassification);
  }

  static finalBoard(board: ILeaderboard[]) {
    const result = [...new Set(board.map((a) => JSON.stringify(a)))].map((a) => JSON.parse(a));
    console.log(result);
    return result;
  }
}
