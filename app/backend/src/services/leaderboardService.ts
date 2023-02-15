import Matches from '../database/models/matches';
import IService, { ILeaderboard } from '../interfaces/interfaces';
import querys from './query';

export default class Leaderboard {
  private matches = Matches;

  getLeaderboardHome = async (): Promise<IService> => {
    const [allMatches] = await this.matches
      .sequelize?.query(querys.homeTeam) as [ILeaderboard[], unknown];

    const table = this.tableMatches(allMatches);
    return { cod: 200, inf: table };
  };

  tableMatches = (allMatches: ILeaderboard[]) =>
    allMatches.map((e) => ({ ...e,
      efficiency: ((e.totalPoints / (e.totalGames * 3)) * 100).toFixed(2),
    }));
}
