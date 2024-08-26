import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Notification extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  customerId: number; // [Ref: > customer.user_id]

  @Column
  notificationTypeId: number; // [Ref: - notification_type.id]

  @Column
  notificationStatusId: number; // [Ref: - notification_status.id ]
}
