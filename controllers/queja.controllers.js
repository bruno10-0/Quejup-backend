import { Queja } from "../models/Queja.js";
import { subirImagen, borrarImagen } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getQuejas = async (req, res) => {
  try {
    const queja = await Queja.findAll();
    console.log("Éxito al consultar las quejas 😃");
    res.json(queja);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getQueja = async (req, res) => {
  try {
    const { id } = req.params;
    const queja = await Queja.findOne({
      where: { id },
    });
    if (!queja)
      return res.status(404).json({ message: "La queja no existe 🤔" });

    console.log(`Éxito al consultar la queja con el ID: ${queja.id} 😃`);
    res.json(queja);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createQueja = async (req, res) => {
  try {
    //console.log(req.body)
    const { opcion, descripcionProblema, lat, lon, UsuarioId } = req.body;
    console.log(res.cookie);
    const newQueja = new Queja({
      titulo: opcion,
      cuerpo: descripcionProblema,
      lon: lon,
      lat: lat,
      UsuarioId,
    });
    //console.log(req.files);
    if (req.files?.imagen) {
      const resultado = await subirImagen(req.files.imagen.tempFilePath);
      //console.log(resultado);
      newQueja.public_id = resultado.public_id;
      newQueja.secure_URL = resultado.secure_url;
      await fs.unlink(req.files.imagen.tempFilePath);
    }
    await newQueja.save();
    console.log("Éxito al crear una queja 😃");
    res.json(newQueja);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateQueja = async (req, res) => {
  try {
    const { id, usuariosMegusta } = req.body; // Extraer el ID y usuariosMegusta del req.body

    const queja = await Queja.findByPk(id); // Buscar la queja por su ID

    if (!queja) {
      console.log(`La queja con el ID: ${id} no existe 🤔`);
      return res
        .status(404)
        .json({ message: `La queja con el ID: ${id} no existe 🤔` });
    }

    // Verifica que usuariosMegusta sea un array antes de actualizar
    if (!Array.isArray(usuariosMegusta)) {
      return res
        .status(400)
        .json({ message: "usuariosMegusta debe ser un array" });
    }

    // Actualiza el campo usuariosMegusta en la queja como un array
    queja.usuariosMegusta = usuariosMegusta;
    await queja.save();

    console.log(
      `Éxito al modificar el campo usuariosMegusta de la queja con el ID: ${queja.id} 😃`
    );
    res.json(queja);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteQueja = async (req, res) => {
  try {
    const { id } = req.params;
    const queja = await Queja.findOne({ where: { id } });

    if (!queja) {
      console.log(`La queja con el ID: ${id} no existe 🤔`);
      return res
        .status(404)
        .json({ message: `La queja con el ID: ${id} no existe 🤔` });
    }
    if (queja.public_id) {
      await borrarImagen(queja.public_id);
    }

    await Queja.destroy({ where: { id } });

    console.log(`Éxito al eliminar la queja con el ID: ${id} 😃`);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
