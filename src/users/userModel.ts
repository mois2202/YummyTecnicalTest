import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  PrimaryKey, 
  AutoIncrement, 
  Unique, 
  AllowNull, 
  Default, 
  CreatedAt 
} from 'sequelize-typescript';

import { UserRoleId, UserRoles }   from '../roles/userRoleInterfacesTypes';
import { User, UserCreation} from './userInterfacesTypes';
import Decimal from 'decimal.js';



@Table({
  tableName: 'users', 
  timestamps: true,  
})
export class UserModel extends Model<User, UserCreation> implements User {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public user!: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  public password!: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isIn: [Object.values(UserRoles)], 
    }
  })
  public role!: UserRoleId;

  // Definimos el campo `balance` como una columna obligatoria
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(20, 2),
    allowNull: false,
  })
  public balance!: Decimal;

  // Definimos el campo `created_at` con un valor predeterminado de la fecha actual
  @Default(DataType.NOW)
  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public created_at!: Date;
}

export default UserModel;