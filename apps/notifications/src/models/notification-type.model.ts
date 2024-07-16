import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class NotificationType extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.STRING(20))
  type: string;
}
