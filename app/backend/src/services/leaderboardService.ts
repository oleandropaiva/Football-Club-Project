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

  getLeaderboardAway = async (): Promise<IService> => {
    const [allMatches] = await this.matches
      .sequelize?.query(querys.awayTeam) as [ILeaderboard[], unknown];

    const table = this.tableMatches(allMatches);
    return { cod: 200, inf: table };
  };

  getLeaderboard = async (): Promise<IService> => {
    const leaderboardHome = await this.getLeaderboardHome();
    const leaderboardAway = await this.getLeaderboardAway();
    const allTable = this.allTable(
      leaderboardHome.inf as ILeaderboard[],
      leaderboardAway.inf as ILeaderboard[],
    );
    const orderdAllTable = this.orderTeams(allTable);
    return { cod: 200, inf: orderdAllTable };
  };

  orderTeams = (teams: ILeaderboard[]) => teams.sort((a, b) => {
    // if (a.efficiency > b.efficiency) return -1;
    // if (a.efficiency < b.efficiency) return 1;
    // if (a.totalPoints > b.totalPoints) return -1;
    // if (a.totalPoints < b.totalPoints) return 1;
    // if (a.totalVictories > b.totalVictories) return -1;
    // if (a.totalVictories < b.totalVictories) return 1;
    // if (a.totalLosses < b.totalLosses) return -1;
    // if (a.totalLosses > b.totalLosses) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  });

  allTable = (leaderboardHome: ILeaderboard[], leaderboardAway: ILeaderboard[]) => leaderboardHome
    .map((home) => {
      const awayTeam = leaderboardAway.find((away) => away.name === home.name);
      return {
        name: home.name,
        totalPoints: Number(home.totalPoints) + Number(awayTeam?.totalPoints),
        totalGames: Number(home.totalGames) + Number(awayTeam?.totalGames),
        totalVictories: Number(home.totalVictories) + Number(awayTeam?.totalVictories),
        totalDraws: Number(home.totalDraws) + Number(awayTeam?.totalDraws),
        totalLosses: Number(home.totalLosses) + Number(awayTeam?.totalLosses),
        goalsFavor: Number(home.goalsFavor) + Number(awayTeam?.goalsFavor),
        goalsOwn: Number(home.goalsOwn) + Number(awayTeam?.goalsOwn),
        goalsBalance: Number(home.goalsBalance) + Number(awayTeam?.goalsBalance),
        efficiency: (((Number(home.totalPoints) + Number(awayTeam?.totalPoints))
        / ((Number(home.totalGames) + Number(awayTeam?.totalGames)) * 3)) * 100).toFixed(2),

        // [P / (J * 3)] * 100, onde:

        // efficiency: (((home.totalPoints + Number(awayTeam?.totalPoints))
        //   / ((home.totalGames + Number(awayTeam?.totalGames)) * 3)) * 100).toFixed(2),
      };
    });

  tableMatches = (allMatches: ILeaderboard[]) =>
    allMatches.map((e) => ({ ...e,
      efficiency: ((e.totalPoints / (e.totalGames * 3)) * 100).toFixed(2),
    }));
}
