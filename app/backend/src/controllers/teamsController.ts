import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private teamService = new TeamService();
  team = async (req: Request, res: Response) => {
    const { cod, inf } = await this.teamService.team();
    return res.status(cod).json(inf);
  };
}
