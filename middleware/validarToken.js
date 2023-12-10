import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//variables de entorno desde el archivo .env
dotenv.config();

export const autenticacion = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No hay un token, autorización invalida." });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Token invalido." });

    req.user=user
      
    next();
  });
};
