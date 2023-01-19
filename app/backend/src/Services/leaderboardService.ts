import { ILeaderboard, IMatch } from '../interfaces';
import LeaderboardFunctions from '../helpers/leaderboardFuncions';

export default class LeaderboardService {
  static buildLeaderboard(allMatches: IMatch[], homeOrAway: string) {
    const boardClassification: ILeaderboard[] = allMatches.map((match) => ({
      name: LeaderboardFunctions.namme(match, homeOrAway),
      totalPoints: LeaderboardFunctions.totalPoints(match, homeOrAway, allMatches),
      totalGames: LeaderboardFunctions.totalGames(match, homeOrAway, allMatches).length,
      totalVictories: LeaderboardFunctions.totalVictories(match, homeOrAway, allMatches),
      totalDraws: LeaderboardFunctions.totalDraws(match, homeOrAway, allMatches),
      totalLosses: LeaderboardFunctions.totalLosses(match, homeOrAway, allMatches),
      goalsFavor: LeaderboardFunctions.goalsFavor(match, homeOrAway, allMatches),
      goalsOwn: LeaderboardFunctions.goalsOwn(match, homeOrAway, allMatches),
      goalsBalance: LeaderboardFunctions.goalsBalance(match, homeOrAway, allMatches),
      efficiency: LeaderboardFunctions.efficiency(match, homeOrAway, allMatches),
    }));

    return this.finalBoard(boardClassification);
  }

  static finalBoard(board: ILeaderboard[]) {
    const result = [...new Set(board.map((a) => JSON.stringify(a)))].map((a) => JSON.parse(a));
    console.log({ board, result });
    return result;
  }

  static eficiencia(team: ILeaderboard, away: ILeaderboard) {
    const totalPoints = team.totalPoints + away.totalPoints;
    const totalGames = team.totalGames + away.totalGames;
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static buildAllLeaderboard(allMatches: IMatch[]) {
    const homeClassificacao = this.buildLeaderboard(allMatches, 'home');
    const awayClassificacao = this.buildLeaderboard(allMatches, 'away');
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
