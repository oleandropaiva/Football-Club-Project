import Users from '../database/models/users';
import genToken from './genToken';

export interface IuserService {
  cod: number;
  inf: object;
}

export default class LoginService {
  private user = Users;
  login = async (email: string, password: string): Promise<IuserService> => {
    // const regex = /^.@.\.com$/;
    if (!email || !password) return ({ cod: 400, inf: { message: 'All fields must be filled' } });

    const getUser = await this.user.findOne({ where: { email } }) as Users;
    if (!getUser) return ({ cod: 401, inf: { message: 'Incorrect email or password' } });

    const token = genToken(getUser.email);
    return { cod: 200, inf: { token } };
  };
}
