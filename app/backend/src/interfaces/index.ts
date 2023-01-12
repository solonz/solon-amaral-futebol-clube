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

export { ILogin, IToken, IUser, INewMatch };
