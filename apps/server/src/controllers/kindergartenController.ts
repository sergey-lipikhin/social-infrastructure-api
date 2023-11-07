import { Request, Response } from 'express';
import { kindergartenService } from '../services/kindergartenService';

async function getAll(_req: Request, res: Response) {
  const kindergartens = await kindergartenService.getAll();

  res.send(kindergartens);
}

export const kindergartenController = {
  getAll,
};
