import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  getMatches = async (req: Request, res: Response) => {
    const { cod, inf } = await this.matchesService.getMatches();
    return res.status(cod).json(inf);
  };
}
