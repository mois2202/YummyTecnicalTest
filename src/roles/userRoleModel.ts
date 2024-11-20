import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    AfterSync
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'user_roles', 
    timestamps: false,      
  })
  export class UserRoleModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id!: number;
  
    @Unique
    @Column({
      type: DataType.STRING(50),
      allowNull: false,
    })
    public role_name!: string;
  
    @Column({
      type: DataType.DECIMAL(10, 2), 
      allowNull: false,
    })
    public initial_balance!: number;

    @AfterSync
    static async initializeRoles() {
      const initialRoles = [
        { role_name: 'payer', initial_balance: 1000.00 },
        { role_name: 'collector', initial_balance: 100.00 },
      ];
      // Inserta roles iniciales, evitando duplicados
      for (const role of initialRoles) {
        await UserRoleModel.findOrCreate({
          where: { role_name: role.role_name },
          defaults: role,
        });
      }
  
      console.log('Roles inicializados correctamente.');
    }
  }
  