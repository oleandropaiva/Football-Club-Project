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

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cod, inf } = await this.matchesService.updateMatch(id);
    return res.status(cod).json(inf);
  };

  updateMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cod, inf } = await this.matchesService.updateMatchInProgress(id, req.body);
    return res.status(cod).json(inf);
  };
}
