import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

@Table
export class HotelBooking extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  customerId: number; // [Ref: > customer.user_id]

  @Column
  bookingStatusId: number; // [Ref: - booking_status.id]

  @Column
  transactionId: number; // [Ref: - transaction.id]
}
