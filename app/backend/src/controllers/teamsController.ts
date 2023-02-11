import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private teamService = new TeamService();
  team = async (req: Request, res: Response) => {
    const { cod, inf } = await this.teamService.team();
    return res.status(cod).json(inf);
  };

  teamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cod, inf } = await this.teamService.teamById(Number(id));
    return res.status(cod).json(inf);
  };
}
