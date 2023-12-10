import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Queja = sequelize.define("Queja", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // llave primaria
    autoIncrement: true, // incremento automático
  },
  titulo: {
    type: DataTypes.STRING,
  },
  cuerpo: {
    type: DataTypes.STRING,
  },
  public_id: {
    type: DataTypes.STRING,
  },
  secure_URL: {
    type: DataTypes.STRING,
  },
  lon: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.STRING,
  },
  servación: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  usuariosMegusta: {
    type: DataTypes.ARRAY(DataTypes.JSON)
  },
});
