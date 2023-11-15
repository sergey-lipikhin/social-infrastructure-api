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
      isIncluded: attributes.typeOfPoint === 'business'
        ? true
        : Math.random() < 0.85,
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

  const { id } = await experimentService.create(
    { initial, ...params }, result,
  );

  const experiment = await experimentService.getById(id);

  if (!experiment) {
    throw ApiError.BadRequest('Посилка при збережені експерименту');
  }

  const { initial: skip, ...experimentNormalized } = experiment;

  res.send({ ...experimentNormalized });
}

async function getAll(_req: Request, res: Response) {
  const experiments = await experimentService.getAll();
  const experimentNormalized = experiments.map(({
    initial,
    ...rest
  }) => ({ ...rest }));

  res.send(experimentNormalized);
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const foundExperiment = await experimentService.getById(id);

  if (!foundExperiment) {
    throw ApiError.NotFound('Такого експерименту не існує');
  }

  await experimentService.remove(id);

  res.sendStatus(200);
}

export const experimentController = {
  makeExperiment,
  getAll,
  remove,
};
