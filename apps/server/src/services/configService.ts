import { Config } from '../models/Config';

async function getByName(name: string) {
  return Config.findOne({
    where: {
      name,
    },
  });
}

export const configService = {
  getByName,
};
