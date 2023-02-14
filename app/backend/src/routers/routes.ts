import { Router } from 'express';
import LoginController from '../controllers/loginControllers';
import TeamController from '../controllers/teamsController';
import MatchesController from '../controllers/matchesControllers';
import LeaderboardController from '../controllers/leaderboardController';

const routes = Router();
const loginController = new LoginController();
const teamController = new TeamController();
const matchesController = new MatchesController();
const leaderboardController = new LeaderboardController();

routes.post('/login', loginController.login);
routes.get('/login/validate', loginController.validateLogin);

routes.get('/teams', teamController.team);
routes.get('/teams/:id', teamController.teamById);

routes.post('/matches', matchesController.addMatch);
routes.get('/matches', matchesController.getMatches);
routes.patch('/matches/:id/finish', matchesController.updateMatch);
routes.patch('/matches/:id', matchesController.updateMatchInProgress);

routes.get('/leaderboard/home', leaderboardController.getLeaderboard);

export default routes;
