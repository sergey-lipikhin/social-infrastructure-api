import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  collate: 'utf8_general_ci',
  timestamps: true,
  paranoid: false,
})
export class User extends Model {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare activationToken: string | null;
}
