import express from 'express'
import sequelize from './shared/db/dbConnection';
import { UserRoutes } from './users/userRoute';
import dotenv from 'dotenv'
import { UserRoleRoutes } from './roles/userRoleRoute';
import { TransactionRoutes } from './transactions/transactionRoute';
import { authRoutes } from './auth/authRoute';
import { createDefaultUser } from './shared/helpers/createDefaultUser';
import swaggerUI from 'swagger-ui-express'
import { specs } from './shared/helpers/swagger/SwaggerDocumentation';


dotenv.config()

const PORT = 3000

export const app = express();

app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('/payment', UserRoutes);
app.use ('/payment', UserRoleRoutes);
app.use ('/payment', TransactionRoutes)
app.use ('/payment', authRoutes)



const main = async () => {
  try {
      // Autenticación de conexión a la base de datos
      await sequelize.authenticate();
      console.log("Connection to database established successfully.");
      
      // Sincronización de los modelos
      await sequelize.sync({ alter: true });
      console.log("Sync successfully with db and Sequelize models.");

      // Crear el usuario por defecto
      await createDefaultUser();
      console.log("Default User is ready, read the README file to get all access.");

      app.listen(PORT, () => {
          console.log(`Server is ready on port ${PORT}`);
      });
  } catch (error) {
      console.error('Error during database connection or project execution:', error);
  }
};

main(); 