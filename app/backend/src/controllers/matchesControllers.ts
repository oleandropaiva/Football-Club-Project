import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const { cod, inf } = await this.matchesService.matchesInProgress(
        inProgress as string,
      );
      return res.status(cod).json(inf);
    }

    const { cod, inf } = await this.matchesService.getMatches();
    return res.status(cod).json(inf);
  };

  addMatch = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;
    if (Object.keys(req.body).length > 0) {
      const { cod, inf } = await this.matchesService.addMatch(req.body, token as string);
      return res.status(cod).json(inf);
    }
  };
}
