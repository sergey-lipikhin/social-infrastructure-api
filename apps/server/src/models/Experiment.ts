/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasOne,
} from 'sequelize-typescript';
import {
  type ExperimentOutput,
  type ExperimentInput,
} from '../types/experiment';
import { Rating } from './Rating';

@Table({
  tableName: 'experiment',
  collate: 'utf8_general_ci',
  timestamps: false,
})
export class Experiment extends Model {
  @AllowNull(false)
  @Column(DataType.JSON)
  declare initial: ExperimentInput;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare result: ExperimentOutput;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  declare iterationsThreshold: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  declare hasEquipment: boolean;

  @HasOne(() => Rating, { foreignKey: 'experimentId' })
  declare rating: unknown;
}
