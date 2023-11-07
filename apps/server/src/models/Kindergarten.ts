import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'kindergartens',
  collate: 'utf8_general_ci',
  timestamps: false,
})
export class Kindergarten extends Model {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;
}
