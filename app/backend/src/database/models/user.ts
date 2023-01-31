import { Model, STRING } from 'sequelize';
import db from '.';

class Example extends Model {
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Example.init({
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default Example;
