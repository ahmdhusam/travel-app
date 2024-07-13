import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class NotificationStatus extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.STRING(20))
  status: string;
}
