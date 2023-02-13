import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import Users from '../database/models/users';
import genToken from './genToken';
import IService from '../interfaces/interfaces';
import CustomError from '../middlewares/error';

export default class LoginService {
  private user = Users;
  login = async (email: string, password: string): Promise<IService> => {
    if (!email || !password) {
      throw new CustomError(400, 'All fields must be filled');
    }

    const getUser = await this.user.findOne({ where: { email } }) as Users;
    if (!getUser) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const passwordVerify = await bcrypt.compare(password, getUser.password);
    if (!passwordVerify) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const token = genToken(getUser.email);
    return { cod: 200, inf: { token } };
  };

  validateLogin = async (token: string): Promise<IService> => {
    const { email } = JWT.verify(token, process.env.JWT_SECRET as string) as JWT.JwtPayload;
    const getUser = await this.user.findOne({ where: { email } }) as Users;
    return { cod: 200, inf: { role: getUser.role } };
  };
}
