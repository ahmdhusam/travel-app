import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.STRING(50))
  username: string;

  @Column(DataType.STRING(50))
  firstName: string;

  @Column(DataType.STRING(50))
  lastName: string;

  @Column(DataType.STRING(50))
  email: string;

  @Column(DataType.STRING(100))
  password: string;

  @Column
  isActivated: boolean;

  @Column
  isSuperuser: boolean;

  @DeletedAt
  deletedAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @CreatedAt
  createdAt: Date;

  // Ref
  //  @Column
  //  user_type: UserType;
  //
  //  @Column
  //  customer_id: Customer;
}
