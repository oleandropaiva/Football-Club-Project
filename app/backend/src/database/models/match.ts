import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Matche extends Model {
  homeTeamId!: number;
  homeTeamGoals!: number;
  awayTeamId!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matche.init({
  homeTeamId: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeamId: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matche',
  timestamps: false,
});

export default Matche;
// test
