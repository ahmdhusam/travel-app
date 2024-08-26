import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class UserType extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.STRING(50))
  userTypeName: string;
}
