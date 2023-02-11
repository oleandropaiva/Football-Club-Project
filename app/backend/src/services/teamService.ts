import Teams from '../database/models/teams';
import IService from '../interfaces/interfaces';

export default class TeamService {
  private teams = Teams;
  team = async (): Promise<IService> => {
    const getTeams = await this.teams.findAll() as Teams[];
    return { cod: 200, inf: getTeams };
  };

  teamById = async (id: number): Promise<IService> => {
    const getTeam = await this.teams.findOne({ where: { id } }) as Teams;
    return { cod: 200, inf: getTeam };
  };
}
