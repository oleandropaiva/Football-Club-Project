import Matches from '../database/models/matches';
import IService from '../interfaces/interfaces';
import Teams from '../database/models/teams';

export default class MatchService {
  private matches = Matches;

  getMatches = async (): Promise<IService> => {
    const allMatches = await this.matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    }) as Matches[];

    return { cod: 200, inf: allMatches };
  };
}
