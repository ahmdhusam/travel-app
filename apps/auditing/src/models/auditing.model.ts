import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Auditing extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  details: string;
}
