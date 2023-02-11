import { Router } from 'express';
import LoginController from '../controllers/loginControllers';
import TeamController from '../controllers/teamsController';

const routes = Router();
const loginController = new LoginController();
const teamController = new TeamController();

routes.post('/login', loginController.login);
routes.get('/login/validate', loginController.validateLogin);
routes.get('/teams', teamController.team);

export default routes;
