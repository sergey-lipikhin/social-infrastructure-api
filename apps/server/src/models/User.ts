import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

// Conflict between public class fields and Sequelize's attribute
// getters and setters.
// By adding the declare keyword, you are telling TypeScript to treat
// these fields as ambient declarations and not emit any JavaScript
// code for them. And sequelize stays aware of these fields
@Table({
  tableName: 'users',
  collate: 'utf8_general_ci',
  timestamps: true,
  paranoid: true,
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

  @AllowNull(false)
  @Column(DataType.STRING)
  declare surname: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare activationToken: string | null;
}
