import { Request, Response } from 'express';
import Leaderboard from '../services/leaderboardService';

export default class LeaderboardController {
  private leaderboardService = new Leaderboard();

  getLeaderboardHome = async (_req: Request, res: Response) => {
    const { cod, inf } = await this.leaderboardService.getLeaderboardHome();
    return res.status(cod).json(inf);
  };
}
