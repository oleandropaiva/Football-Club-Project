import { Router } from 'express';
import LoginController from '../controllers/loginControllers';

const routes = Router();
const loginController = new LoginController();

routes.post('/login', loginController.login);

export default routes;
