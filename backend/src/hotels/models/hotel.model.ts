import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Hotel {
  @PrimaryKey
  @Column
  id: number;

  @Column
  customerId: number; // Ref

  @Column
  bookingStatusId: number; // Ref

  @Column
  transactionId: number; // Ref
}
