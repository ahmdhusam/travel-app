import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class TransactionDetails extends Model {
  @PrimaryKey
  @Column
  id: number; // [Ref: > transaction.id]

  @Column(DataType.STRING(300))
  details: string;
}
