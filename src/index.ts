import express from 'express'
import sequelize from './shared/db/dbConnection';
import { UserRoutes } from './users/userRoute';
import dotenv from 'dotenv'

dotenv.config()

const PORT = 3000

const app = express();

app.use(express.json());

app.use('/pagos', UserRoutes);



const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database established successfully.");
        await sequelize.sync({ alter: true });
        console.log("Sync succesfully with db and sequalize models.");
    
        app.listen(PORT, () => {
          console.log(`Server is ready on port ${PORT}`);
        });
      } 
      
      catch (error) {
        console.error('Error during database connection or project execution:', error);
      }
}

main();