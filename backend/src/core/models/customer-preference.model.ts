import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class CustomerPreference extends Model {
  @PrimaryKey
  @Column
  customerId: number; // [Ref: - customer.user_id]

  @Column
  preferences: string;
}
