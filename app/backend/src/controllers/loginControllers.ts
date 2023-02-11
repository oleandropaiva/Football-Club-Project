import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private loginService = new LoginService() ;
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { cod, inf } = await this.loginService.login(email, password);
    return res.status(cod).json(inf);
  };

  validateLogin = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;
    const { cod, inf } = await this.loginService.validateLogin(token as string);
    return res.status(cod).json(inf);
  };
}
