import Users from '../database/models/users';
import genToken from './genToken';

export interface IuserService {
  cod: number;
  inf: object;
}

export default class LoginService {
  private user = Users;
  login = async (email: string, _password: string): Promise<IuserService> => {
    if (!email) return ({ cod: 400, inf: { message: 'All fields must be filled' } });

    const getUser = await this.user.findOne({ where: { email } }) as Users;
    const token = genToken(getUser.email);
    return { cod: 200, inf: { token } };
  };
}
