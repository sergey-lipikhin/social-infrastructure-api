import { Kindergarten } from '../models/Kindergarten';

async function getAll(): Promise<Kindergarten[]> {
  return Kindergarten.findAll({
    order: [
      ['id', 'ASC'],
    ],
  });
}

export const kindergartenService = {
  getAll,
};
