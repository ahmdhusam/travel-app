import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';

@Table
export class Transaction extends Model<Transaction> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  paymentTypeId: number; // [Ref: - payment_integration_type.id]

  @Column
  paymentStatusId: number; // [Ref: - payment_status.id]

  @Column({ allowNull: false })
  paymentOrderId: string;

  @Column(DataType.JSON)
  details: CreateFlightOrderDto; // TODO: Move it to TransactionDetails
}
