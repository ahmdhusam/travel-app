import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class PaymentIntegrationType extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  type: string;
}
