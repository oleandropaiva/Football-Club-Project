import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Match from './matches';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Match.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'teamHome' });
Match.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'teamAway' });

Teams.hasMany(Match, { foreignKey: 'homeTeamId', as: 'teamHome' });
Teams.hasMany(Match, { foreignKey: 'awayTeamId', as: 'teamAway' });

export default Teams;
