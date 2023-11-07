import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

import { User } from '../models/User';
import { Kindergarten } from '../models/Kindergarten';

export const initDb = async(): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_NAME,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    logging: false,
    models: [User, Kindergarten],
  });

  try {
    sequelize.authenticate({ logging: false });
    global.console.log('Connection to db has been established successfully.');
  } catch (error) {
    global.console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};
