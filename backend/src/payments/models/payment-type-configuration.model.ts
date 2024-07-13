import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class PaymentTypeConfiguration extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  paymentIntegrationTypeId: number; // [Ref: - payment_integration_type.id]
}
