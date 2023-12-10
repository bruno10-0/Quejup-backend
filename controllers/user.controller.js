import { Usuarios } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { crearTokenAcceso } from "../libs/jwt.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const cerrarsSesion = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const inciarSesion = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Variable para saber si encontramo al ususario con el email ingresado en el login :) pd:mucho texto lo sé
    const usuarioEncontrado = await Usuarios.findOne({ where: { email } });

    if (!usuarioEncontrado)
      return res
        .status(400)
        .json({ error: "No existe registro del email ingresado" });

    const match = await bcryptjs.compare(password, usuarioEncontrado.password);

    if (!match)
      return res.status(400).json({ error: "La contraseña es incorrecta" });

    // Guardar el usuario en la base de datos
    const token = await crearTokenAcceso({ id: usuarioEncontrado.id });
    res.cookie("token", token);
    res.json({
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
      createdAt: usuarioEncontrado.createdAt,
      updatedAt: usuarioEncontrado.updatedAt,
      img_perfil: usuarioEncontrado.img_perfil,
    });
  } catch (error) {
    // Manejo de errores: si ocurre un error, responder con un mensaje de error
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    console.log(usuarios);
    res.json(usuarios);
    console.log("Exito al consultar los usuarios 😃");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuarios.findOne({
      where: { id },
    });
    console.log(`Éxito al consultar el usuario con el ID ${usuario.id} 😃`);
    if (!usuario)
      return res.status(404).json({ error: "El usuario no existe 🤔" });
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, isAdmin, phoneNumber } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await Usuarios.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con el email ingresado." });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const verificationToken = Jwt.sign({ email }, process.env.TOKEN_SECRET);

    const newUsuario = await Usuarios.create({
      name,
      email,
      password: passwordHash,
      isAdmin,
      verificationToken,
      phoneNumber,
    });

    // Configura Nodemailer para enviar el correo de verificación
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: "quejup01@gmail.com",
          pass: "ptnjxdpcyltxeoty",
        },
      });
      const mailOptions = {
        from: "quejup01@gmail.com",
        to: email, // Usar el correo del usuario
        subject: "Confirma tu correo electrónico",
        html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
     <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f3f3;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
    }
    a {
      text-decoration: none;
      color: #007BFF;
    }
  </style>  
  </head>
  <body>
    <div class="container">
      <h1>Confirmación de Correo Electrónico</h1>
      <p>Hola,</p>
      <p>Gracias por registrarte en nuestro servicio. Para confirmar tu correo electrónico, haz clic en el siguiente enlace:</p>
      <p><a href="http://localhost:3000/api/confirmar/${verificationToken}">Verificar Correo Electrónico</a></p>
      <p>Si no solicitaste este correo, puedes ignorarlo con seguridad.</p>
    </div>
  </body>
  </html>
`,
      };

      // Envía el correo de verificación
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "No se pudo enviar el correo de verificación." });
        } else {
          console.log("Correo de verificación enviado: " + info.response);
          res.json({
            id: newUsuario.id,
            name: newUsuario.name,
            email: newUsuario.email,
            img_perfil: newUsuario.img_perfil,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surename, email, password } = req.body;

    const user = await Usuarios.findByPk(id);
    user.name = name;
    user.surename = surename;
    user.email = email;
    user.password = password;
    console.log(user);

    await user.save();
    res.json(user);
    console.log("Exito al actualizar un usuario 😃");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuarios.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
    console.log("Exito al eliminar un usuario 😃");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const emailConfirmado = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuarios.findOne({
    where: { email },
  });

  if (!usuario) {
    return res
      .status(400)
      .json({ error: "No existe registro del email ingresado" });
  }

  if (usuario.verificationToken === "" || usuario.verificationToken == null) {
    return res.json({ result: true });
  } else {
    return res.status(400).json({
      error:
        "Para acceder, por favor confirme su dirección de correo electrónico.",
    });
  }
};
