import express from "express";
import dotenv from "dotenv";
import queja from "./routes/queja.routes.js";
import user from "./routes/user.routes.js";
import publicacion from "./routes/publicacion.routes.js"
import cors from "cors";
import morgan from "morgan"
import cookieParser from "cookie-parser";

//variables de entorno
dotenv.config();
const port = process.env.PORT;

//express
const app = express();

//comunicacion entre servidores:
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}));

//morgan
app.use(morgan('dev')) 

//pasar a JSON los datos, usando express 
app.use(express.json());

//Poder leer las cookies
app.use(cookieParser());

//rutas:
app.use("/api", queja);
app.use("/api", user);
app.use("/api", publicacion);

//correr en servidor:
app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto http://localhost:${port}`);
});
