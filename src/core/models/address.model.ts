import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Address extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.STRING)
  line1: string;

  @Column(DataType.STRING)
  line2: string;

  @Column(DataType.STRING(20))
  city: string;

  @Column(DataType.STRING(20))
  state: string;

  @Column(DataType.STRING(10))
  zip: string;

  @Column(DataType.STRING(20))
  country: string;
}
