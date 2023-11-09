import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'config',
  collate: 'utf8_general_ci',
  timestamps: false,
})
export class Config extends Model {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare maxGenerations: number;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  declare pCrossover: number;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  declare pMutation: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare popSize: number;
}
