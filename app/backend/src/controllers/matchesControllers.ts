import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const { cod, inf } = await this.matchesService.matchesInProgress(
        inProgress as string,
      );
      return res.status(cod).json(inf);
    }
    const { cod, inf } = await this.matchesService.getMatches();
    return res.status(cod).json(inf);
  };
}
