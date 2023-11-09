import { Experiment } from '../models/Experiment';
import { ExperimentInput, ExperimentOutput } from '../types/experiment';

async function create(
  { initial, timeThreshold, hasEquipment }: ExperimentInput,
  result: ExperimentOutput,
) {
  return Experiment.create({
    initial,
    result,
    timeThreshold,
    hasEquipment,
  });
}

async function getAll() {
  return Experiment.findAll();
}

export const experimentService = {
  create,
  getAll,
};
