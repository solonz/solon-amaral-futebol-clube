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

export { ILogin, IToken, IUser };
