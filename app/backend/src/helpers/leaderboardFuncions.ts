import { IMatch } from '../interfaces';

export default class LeaderboardFunctions {
  static namme(match: IMatch, homeOrAway: string): string {
    const { teamHome, teamAway } = match;
    return (homeOrAway === 'home') ? teamHome.teamName : teamAway.teamName;
  }

  static totalGames(match: IMatch, homeOrAway: string, allMatches: IMatch[]): IMatch[] {
    const result = allMatches.filter((matche) => {
      if (homeOrAway === 'home') {
        return matche.homeTeam === match.homeTeam;
      }
      return matche.awayTeam === match.awayTeam;
    });
    return result;
  }

  static totalHomePoints(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const game = this.totalGames(match, homeOrAway, allMatches);
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

  static totalAwayPoints(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const game = this.totalGames(match, homeOrAway, allMatches);
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

  static totalPoints(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const totalHomePoint = this.totalHomePoints(match, homeOrAway, allMatches);
    const totalAwayPoint = this.totalAwayPoints(match, homeOrAway, allMatches);
    if (homeOrAway === 'home') {
      return totalHomePoint;
    }
    return totalAwayPoint;
  }

  static totalVictories(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const partidas = this.totalGames(match, homeOrAway, allMatches);
    if (homeOrAway === 'home') {
      return (partidas)
        .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length;
    }
    return (partidas)
      .filter((matches) => matches.homeTeamGoals < matches.awayTeamGoals).length;
  }

  static totalDraws(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const partidas = this.totalGames(match, homeOrAway, allMatches);
    return (partidas)
      .filter((matches) => matches.homeTeamGoals === matches.awayTeamGoals).length;
  }

  static totalLosses(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const partidas = this.totalGames(match, homeOrAway, allMatches);
    if (homeOrAway === 'home') {
      return (partidas)
        .filter((matches) => matches.homeTeamGoals < matches.awayTeamGoals).length;
    }
    return (partidas)
      .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length;
  }

  static goalsFavor(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    let goals = 0;
    let goalsAway = 0;
    const partidas = this.totalGames(match, homeOrAway, allMatches);
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

  static goalsOwn(match: IMatch, homeOrAway: string, allMatches: IMatch[]) {
    let goals = 0;
    let goalsAway = 0;
    const partidas = this.totalGames(match, homeOrAway, allMatches);
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

  static goalsBalance(match: IMatch, homeOrAway: string, allMatches: IMatch[]): number {
    const goalsFavor = this.goalsFavor(match, homeOrAway, allMatches);
    const goalsOwn = this.goalsOwn(match, homeOrAway, allMatches);
    const balance = goalsFavor - goalsOwn;
    return balance;
  }

  static efficiency(match: IMatch, homeOrAway: string, allMatches: IMatch[]): string {
    const points = this.totalPoints(match, homeOrAway, allMatches);
    const gamesData = this.totalGames(match, homeOrAway, allMatches);
    const games = gamesData.length;
    // https://javascript.info/number#:~:text=The%20method%20toFixed(n)%20rounds,string%20representation%20of%20the%20result.&text=We%20can%20convert%20it%20to,toFixed(5)%20.
    return ((points / (games * 3)) * 100).toFixed(2);
  }
}
