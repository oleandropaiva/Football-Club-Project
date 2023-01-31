import { Model, STRING } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  teamName!: string;
}

Team.init({
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'teamAway' });

export default Team;
