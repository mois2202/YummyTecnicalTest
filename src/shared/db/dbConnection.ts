import {Sequelize} from "sequelize-typescript";
import config from "./dbConfig";
import { models } from "../../models";

const sequelize = new Sequelize({
  ...config.getDatabaseConfig(),
  dialect: "postgres",
  models,

});


export default sequelize;
