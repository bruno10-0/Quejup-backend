import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Usuarios } from "../models/usuario.js";

// Variables de entorno desde el archivo .env
dotenv.config();

export const verificarToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  Jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
    if (error) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const usuarioEncontrado = await Usuarios.findByPk(user.id);
    if (!usuarioEncontrado) {
      return res.status(401).json({ error: "No autorizado" });
    }

    return res.json({
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
      img_perfil: usuarioEncontrado.img_perfil,
    });
  });
};

export const verificarEmail = async (req, res) => {
  const verificationToken = req.params.token;
  const {email} = Jwt.verify(verificationToken, process.env.TOKEN_SECRET);
  try {
    
    // Realizar una consulta a la base de datos para buscar el token
    const usuario = await Usuarios.findOne({ where: { email } });

    if (usuario) {
      // Limpia el campo verificationToken (lo establece en null)
      usuario.verificationToken = null;
      await usuario.save();

      // Redirige al servidor frontend
      res.redirect("http://localhost:5173/CuentaValidada"); // Cambia esta URL según tu configuración
    } else {
      res.redirect("/error"); // Redirige a una página de error si no se encuentra el token
    }
  } catch (error) {
    // Manejo de errores, por ejemplo, redirigir a una página de error
    console.error(error);
    res.status(500).send("Error al confirmar el correo electrónico.");
  }
};
