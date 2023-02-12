import * as JWT from 'jsonwebtoken';
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

  matchesInProgress = async (query: string): Promise<IService> => {
    // const isTrue = query === 'true';
    const allMatchesInProgress = await this.matches.findAll({
      where: { inProgress: JSON.parse(query) },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    }) as Matches[];

    return { cod: 200, inf: allMatchesInProgress };
  };

  addMatch = async (match: Matches, token: string): Promise<IService> => {
    const verifyToken = JWT.verify(token, process.env.JWT_SECRET as string) as JWT.JwtPayload;
    if (!verifyToken) {
      return { cod: 401, inf: { message: 'Token must be a valid token' } };
    }

    if (match.homeTeamId === match.awayTeamId) {
      return { cod: 422,
        inf: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await Teams.findByPk(match.homeTeamId);
    const awayTeam = await Teams.findByPk(match.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { cod: 404,
        inf: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matches
      .create({ ...match, inProgress: true });

    return { cod: 201, inf: newMatch };
  };

  updateMatch = async (id: string): Promise<IService> => {
    const match = await this.matches.findByPk(id);
    await match?.update({ inProgress: false });

    return { cod: 200, inf: { message: 'Finished' } };
  };
}
