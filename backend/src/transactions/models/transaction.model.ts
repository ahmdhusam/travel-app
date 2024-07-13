import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  paymentTypeId: number; // [Ref: - payment_integration_type.id]

  @Column
  paymentStatusId: number; // [Ref: - payment_status.id]
}
