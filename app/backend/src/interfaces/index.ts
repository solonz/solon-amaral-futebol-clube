interface ILogin {
  email: string,
  password: string,
}

interface IUser extends ILogin{
  id: number,
  username: string,
  role: string,
  // email: string,
  // password: string,
}

export { ILogin, IUser };
