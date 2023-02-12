import { Request, Response } from 'express';
import Matches from '../database/models/matches';
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

    // const { authorization: token } = req.headers;
    // if (Object.values(req.body).length > 0) {
    //   const { cod, inf } = await this.matchesService.addMatch(
    //     req.body,
    //     token as string,
    //   );
    //   return res.status(cod).json(inf);
    // }

    const { cod, inf } = await this.matchesService.getMatches();
    return res.status(cod).json(inf);
  };

  addMatch = async (req: Request, res: Response) => {
    // const { authorization: token } = req.headers;
    const token = req.headers.authorization as string;
    const body = req.body as Matches;
    if (Object.keys(body).length > 0) {
      const { cod, inf } = await this.matchesService.addMatch(body, token);
      return res.status(cod).json(inf);
    }
  };
}
