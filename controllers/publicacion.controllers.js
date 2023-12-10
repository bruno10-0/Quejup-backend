import { Queja } from "../models/Queja.js"; 
import { Usuarios } from "../models/usuario.js";

export const getPublicacion = async (req, res) => {
  try {
    // Realiza una consulta para obtener todos los Usuarios con sus Quejas
    const quejasConUsuarios = await Queja.findAll({
      include: Usuarios
    });
    // Invierte el orden del array sin modificar el original
    const quejasConUsuariosInvertido = [...quejasConUsuarios].reverse();

    // Envía los datos al frontend
    res.json(quejasConUsuariosInvertido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los datos" });
  }
};

export const getQuejasInfraestructura = async (req, res) => {
  try {
    // Realiza una consulta para obtener todas las Quejas con Usuarios
    const quejasConUsuarios = await Queja.findAll({
      include: Usuarios,
      where: {
        titulo: "Infraestructura"
      }
    });

    // Invierte el orden del array sin modificar el original
    const quejasConUsuariosInvertido = [...quejasConUsuarios].reverse();

    // Envía los datos al frontend
    res.json(quejasConUsuariosInvertido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los datos" });
  }
};

export const getQuejasComunitario = async (req, res) => {
  try {
    // Realiza una consulta para obtener todas las Quejas con Usuarios
    const quejasConUsuarios = await Queja.findAll({
      include: Usuarios,
      where: {
        titulo: "Comunitario"
      }
    });

    // Invierte el orden del array sin modificar el original
    const quejasConUsuariosInvertido = [...quejasConUsuarios].reverse();

    // Envía los datos al frontend
    res.json(quejasConUsuariosInvertido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los datos" });
  }
};

export const getQuejasServicio = async (req, res) => {
  try {
    // Realiza una consulta para obtener todas las Quejas con Usuarios
    const quejasConUsuarios = await Queja.findAll({
      include: Usuarios,
      where: {
        titulo: "Servicios"
      }
    });

    // Invierte el orden del array sin modificar el original
    const quejasConUsuariosInvertido = [...quejasConUsuarios].reverse();

    // Envía los datos al frontend
    res.json(quejasConUsuariosInvertido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los datos" });
  }
};

export const getQuejasOtro = async (req, res) => {
  try {
    // Realiza una consulta para obtener todas las Quejas con Usuarios
    const quejasConUsuarios = await Queja.findAll({
      include: Usuarios,
      where: {
        titulo: "Otro"
      }
    });

    // Invierte el orden del array sin modificar el original
    const quejasConUsuariosInvertido = [...quejasConUsuarios].reverse();

    // Envía los datos al frontend
    res.json(quejasConUsuariosInvertido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los datos" });
  }
};


export const getUbicacion = async (req, res) => {
  try {
    const quejas = await Queja.findAll({
      attributes: ["lon", "lat","id"]
    });
    res.json(quejas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};



  