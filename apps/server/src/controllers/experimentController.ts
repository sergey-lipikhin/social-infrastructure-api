import { Request, Response } from 'express';
import {
  ExperimentInput,
  ExperimentOutput,
} from '../types/experiment';
import { experimentService } from '../services/experimentService';
import { configService } from '../services/configService';
import { ApiError } from '../exceptions/ApiError';

async function makeExperiment(req: Request, res: Response) {
  const { initial, ...params }: ExperimentInput = req.body;

  const result: ExperimentOutput = initial.map(
    ({ attributes }) => ({
      ...attributes,
      isIncluded: true,
      equipment: {
        starlink: true,
        generator: false,
        fiberInternet: false,
      },
    }),
  );

  const config = await configService.getByName('main');

  if (!config) {
    throw ApiError.BadRequest('Встановлений конфіг алгоритму не існує');
  }

  const experiment = await experimentService.create(
    { initial, ...params }, result,
  );

  res.send(experiment);
}

async function getAll(_req: Request, res: Response) {
  const experiments = await experimentService.getAll();

  res.send(experiments);
}

export const experimentController = {
  makeExperiment,
  getAll,
};
