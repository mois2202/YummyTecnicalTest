import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
  } from 'sequelize-typescript';
  
  import UserModel from '../users/userModel';
  
  @Table({
    tableName: 'transactions',
    timestamps: true,
  })
  export class TransactionModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
      type: DataType.UUID,
    })
    public id!: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.DECIMAL(20, 2),
    })
    public amount!: number;
  
    @AllowNull(false)
    @Default('pending')
    @Column({
      type: DataType.ENUM('pending', 'confirmed', 'cancelled'),
    })
    public status!: 'pending' | 'confirmed' | 'cancelled';
  
    // Datos del pagador
    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column(DataType.BIGINT.UNSIGNED)
    public payer_id!: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(100),
    })
    public payer_email!: string;
  
    @BelongsTo(() => UserModel, 'payer_id')
    public payer!: UserModel;
  
    // Datos del cobrador
    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column(DataType.BIGINT.UNSIGNED)
    public collector_id!: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(100),
    })
    public collector_email!: string;
  
    @BelongsTo(() => UserModel, 'collector_id')
    public collector!: UserModel;
  
    @CreatedAt
    @Column({
      type: DataType.DATE,
    })
    public created_at!: Date;
  
    @UpdatedAt
    @Column({
      type: DataType.DATE,
    })
    public updated_at!: Date;
  }
  
  export default TransactionModel;
  