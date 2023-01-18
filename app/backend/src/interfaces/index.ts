interface ILogin {
  email: string,
  password: string,
}
interface IToken {
  token?: string,
}
interface IUser extends ILogin{
  id: number,
  username: string,
  role: string,
}
interface INewMatch {
  homeTeam: number, // O valor deve ser o id do time
  awayTeam: number, // O valor deve ser o id do time
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatchUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number | string,
}

interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export { ILogin, IToken, IUser, INewMatch, IMatchUpdate, ILeaderboard, IMatch };
