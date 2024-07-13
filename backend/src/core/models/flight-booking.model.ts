import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class FlightBooking extends Model {
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
