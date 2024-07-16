import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Customer extends Model {
  @PrimaryKey
  @Column
  userId: number; // it could be Ref

  @Column
  addressId: number; // [Ref: - address.id]
}
