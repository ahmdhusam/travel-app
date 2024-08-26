import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Transaction } from './transaction.model';

@Table
export class TransactionDetails extends Model {
  @PrimaryKey
  @Column
  id: number; // [Ref: > transaction.id]

  @Column(DataType.JSON)
  details: CreateFlightOrderDto;

  @ForeignKey(() => Transaction)
  @Column(DataType.INTEGER)
  transactionId: number;

  @BelongsTo(() => Transaction)
  transaction: Transaction;
}
