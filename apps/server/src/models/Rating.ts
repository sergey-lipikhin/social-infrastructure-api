/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Validate,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Experiment } from './Experiment';

@Table({
  tableName: 'rating',
  collate: 'utf8_general_ci',
  timestamps: false,
})
export class Rating extends Model {
  @AllowNull(false)
  @Default('')
  @Column(DataType.STRING)
  declare notations: string;

  @AllowNull(false)
  @Default(0)
  @Validate({
    min: 0,
    max: 5,
  })
  @Column(DataType.INTEGER)
  declare value: boolean;

  @ForeignKey(() => Experiment)
  @Column(DataType.INTEGER)
  declare experimentId: number;

  @BelongsTo(() => Experiment)
  declare experiment: Experiment;
}
