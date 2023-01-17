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
    return result;
  }

  static eficiencia(team: ILeaderboard, away: ILeaderboard) {
    const totalPoints = team.totalPoints + away.totalPoints;
    const totalGames = team.totalGames + away.totalGames;
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static async buildAllLeaderboard(allMatches: IMatch[]) {
    const homeClassificacao = await this.buildLeaderboard(allMatches, 'home');
    const awayClassificacao = await this.buildLeaderboard(allMatches, 'away');
    const classifica = homeClassificacao.map((team) => {
      const away = awayClassificacao.find((time) => time.name === team.name);
      return {
        name: team.name,
        totalPoints: team.totalPoints + away.totalPoints,
        totalGames: team.totalGames + away.totalGames,
        totalVictories: team.totalVictories + away.totalVictories,
        totalDraws: team.totalDraws + away.totalDraws,
        totalLosses: team.totalLosses + away.totalLosses,
        goalsFavor: team.goalsFavor + away.goalsFavor,
        goalsOwn: team.goalsOwn + away.goalsOwn,
        goalsBalance: team.goalsBalance + away.goalsBalance,
        efficiency: this.eficiencia(team, away),
      };
    });
    return this.finalBoard(classifica);
  }
}
