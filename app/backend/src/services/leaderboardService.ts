import Matches from '../database/models/matches';
import IService, { ILeaderboard } from '../interfaces/interfaces';
import querys from './query';

export default class Leaderboard {
  private matches = Matches;

  getLeaderboard = async (): Promise<IService> => {
    const [allMatches] = await this.matches
      .sequelize?.query(querys.homeTeam) as ILeaderboard[];
    return { cod: 200, inf: allMatches };
  };
}
