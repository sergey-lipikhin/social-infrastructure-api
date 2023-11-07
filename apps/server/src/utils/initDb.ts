import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

import { User } from '../models/User';

export const initDb = async(): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    models: [User],
  });

  try {
    sequelize.authenticate({ logging: false });
    global.console.log('Connection to db has been established successfully.');
  } catch (error) {
    global.console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};
