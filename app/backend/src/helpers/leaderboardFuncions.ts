import { ILeaderboard, IMatch } from '../interfaces';
import TeamsService from '../Services/teamsService';
import MatchesService from '../Services/matchesService';
import LeaderboardService from '../Services/leaderboardService';

export default class LeaderboardFunctions {
  static async namme(match: IMatch, homeOrAway: string): Promise <undefined | string> {
    const { homeTeam, awayTeam } = match;
    const teams = await TeamsService.team(
      (homeOrAway !== 'home') ? awayTeam : homeTeam,
    );

    return teams?.teamName;
  }

  static async totalGames(match: IMatch, homeOrAway: string): Promise<IMatch[]> {
    const partidas = await MatchesService.finishedMatches();

    const result = partidas.filter((matche) => {
      if (homeOrAway === 'home') {
        return matche.homeTeam === match.homeTeam;
      }
      return matche.awayTeam === match.awayTeam;
    });
    return result;
  }

  static async totalHomePoints(match: IMatch, homeOrAway: string): Promise<number> {
    const game = await this.totalGames(match, homeOrAway);
    let homePoints = 0;
    game.forEach((matche) => {
      if (matche.homeTeamGoals > matche.awayTeamGoals) {
        homePoints += 3;
      }
      if (matche.homeTeamGoals === matche.awayTeamGoals) {
        homePoints += 1;
      }
    });
    return homePoints;
  }

  static async totalAwayPoints(match: IMatch, homeOrAway: string): Promise<number> {
    const game = await this.totalGames(match, homeOrAway);
    let awayPoints = 0;
    game.forEach((matche) => {
      if (matche.homeTeamGoals < matche.awayTeamGoals) {
        awayPoints += 3;
      }
      if (matche.homeTeamGoals === matche.awayTeamGoals) {
        awayPoints += 1;
      }
    });
    return awayPoints;
  }

  static async totalPoints(match: IMatch, homeOrAway: string): Promise<number> {
    const totalHomePoint = await this.totalHomePoints(match, homeOrAway);
    const totalAwayPoint = await this.totalAwayPoints(match, homeOrAway);
    if (homeOrAway === 'home') {
      return totalHomePoint;
    }
    return totalAwayPoint;
  }

  static async totalVictories(match: IMatch, homeOrAway: string): Promise<number | unknown> {
    const partidas = await this.totalGames(match, homeOrAway);
    if (homeOrAway === 'home') {
      return (await partidas)
        .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length;
    }
    return (await partidas)
      .filter((matches) => matches.homeTeamGoals < matches.awayTeamGoals).length;
  }

  static async totalDraws(match: IMatch, homeOrAway: string): Promise<number> {
    const partidas = await this.totalGames(match, homeOrAway);
    return (await partidas)
      .filter((matches) => matches.homeTeamGoals === matches.awayTeamGoals).length;
  }

  static async totalLosses(match: IMatch, homeOrAway: string): Promise<number> {
    const partidas = await this.totalGames(match, homeOrAway);
    if (homeOrAway === 'home') {
      return (await partidas)
        .filter((matches) => matches.homeTeamGoals < matches.awayTeamGoals).length;
    }
    return (await partidas)
      .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length;
  }

  static async goalsFavor(match: IMatch, homeOrAway: string): Promise<number> {
    let goals = 0;
    let goalsAway = 0;
    const partidas = await this.totalGames(match, homeOrAway);
    partidas.forEach((partida) => {
      if (homeOrAway === 'home') {
        goals += partida.homeTeamGoals;
      }
      goalsAway += partida.awayTeamGoals;
    });
    if (homeOrAway === 'home') {
      return goals;
    }
    return goalsAway;
  }

  static async goalsOwn(match: IMatch, homeOrAway: string) {
    let goals = 0;
    let goalsAway = 0;
    const partidas = await this.totalGames(match, homeOrAway);
    partidas.forEach((partida) => {
      if (homeOrAway === 'home') {
        goals += partida.awayTeamGoals;
      }
      goalsAway += partida.homeTeamGoals;
    });
    if (homeOrAway === 'home') {
      return goals;
    }
    return goalsAway;
  }

  static async goalsBalance(match: IMatch, homeOrAway: string): Promise<number> {
    const goalsFavor = await this.goalsFavor(match, homeOrAway);
    const goalsOwn = await this.goalsOwn(match, homeOrAway);
    const balance = goalsFavor - goalsOwn;
    return balance;
  }

  static async efficiency(match: IMatch, homeOrAway: string): Promise<number> {
    const points = await this.totalPoints(match, homeOrAway);
    const gamesData = await this.totalGames(match, homeOrAway);
    const games = gamesData.length;
    // https://javascript.info/number#:~:text=The%20method%20toFixed(n)%20rounds,string%20representation%20of%20the%20result.&text=We%20can%20convert%20it%20to,toFixed(5)%20.
    return Number(((points / (games * 3)) * 100).toFixed(2));
  }

  static async finishedMatches() {
    const allFinishedMatches = MatchesService.finishedMatches();
    return allFinishedMatches;
  }

  static async getClassification(homeOrAway: string): Promise<ILeaderboard[]> {
    const matchesFinished = await this.finishedMatches();
    return LeaderboardService.buildLeaderboard(matchesFinished, homeOrAway);
  }
}
