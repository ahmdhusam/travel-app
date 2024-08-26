import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Role extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.STRING(50))
  roleName: string;

  @Column(DataType.TEXT)
  roleDescription: string;
}
