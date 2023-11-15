import { Experiment } from '../models/Experiment';
import { ExperimentInput, ExperimentOutput } from '../types/experiment';

async function create(
  { initial, iterationsThreshold, hasEquipment }: ExperimentInput,
  result: ExperimentOutput,
) {
  return Experiment.create({
    initial,
    result,
    iterationsThreshold,
    hasEquipment,
  });
}

async function getAll() {
  return Experiment.findAll({ raw: true });
}

async function getById(id: number) {
  return Experiment.findByPk(id, { raw: true });
}

async function remove(id: number) {
  return Experiment.destroy({
    where: { id },
  });
}

export const experimentService = {
  getAll,
  getById,
  create,
  remove,
};
