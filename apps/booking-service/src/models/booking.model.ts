import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class FlightBooking extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  customerId: number; // [Ref: > customer.user_id]

  @Column
  bookingStatusId: number; // [Ref: - booking_status.id]

  @Column
  transactionId: number; // [Ref: - transaction.id]

  @Column({ allowNull: false })
  flightOrderId: string;

  @Column({ allowNull: false })
  paymentOrderId: string;
}
