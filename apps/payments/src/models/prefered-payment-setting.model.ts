import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class PreferedPaymentSetting extends Model {
  @PrimaryKey
  @Column
  customerId: number; // [Ref: - customer.user_id]

  @Column
  paymentIntegrationTypeId: number; // [Ref: - payment_integration_type.id ]
}
