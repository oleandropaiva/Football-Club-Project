import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
// import Matches from './matches';

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

// Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

// Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Teams;
