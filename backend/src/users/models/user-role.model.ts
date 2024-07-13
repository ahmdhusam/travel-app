import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class UserRole extends Model {
  // PRIMARY KEY ("user_id", "role_id")

  @PrimaryKey
  @Column
  userId: number;

  @PrimaryKey
  @Column
  roleId: number;
}
