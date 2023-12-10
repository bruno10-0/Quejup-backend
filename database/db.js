import Sequelize from "sequelize";
import dotenv from "dotenv";

//variables de entorno desde el archivo .env
dotenv.config();

//variables de entorno para la configuración de Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Establece esto en false para desactivar el registro de consultas SQL
  }
);
