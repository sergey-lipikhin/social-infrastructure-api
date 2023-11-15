import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

import { Rating } from '../models/Rating';
import { Experiment } from '../models/Experiment';
import { User } from '../models/User';
import { Config } from '../models/Config';

export const initDb = async(): Promise<Sequelize> => {
  // const sequelize = new Sequelize({
  //   dialect: 'postgres',
  //   host: process.env.DB_HOST,
  //   database: process.env.DB_NAME,
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   logging: false,
  //   models: [User, Rating, Experiment, Config],
  // });

  const sequelize = new Sequelize(
    'postgresql://jabroni%40ukr.net:P9Nt1yvLnDmJ@ep-wild-art-65945557.us-east-2.aws.neon.tech/neondb?sslmode=require',
    {
      dialect: 'postgres',
      logging: false,
      models: [User, Rating, Experiment, Config],
    },
  );

  try {
    sequelize.authenticate({ logging: false });
    global.console.log('Connection to db has been established successfully.');
  } catch (error) {
    global.console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};
