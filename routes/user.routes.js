import { Router } from "express";

import {
  createUser,
  getUsers,
  deleteUsuario,
  updateUsuario,
  getUser,
  inciarSesion,
  cerrarsSesion,
  emailConfirmado,
} from "../controllers/user.controller.js";

import {
  verificarToken,
  verificarEmail,
} from "../controllers/auth.controllers.js";

const router = Router();

router.get("/users", getUsers); //funciona 😃
router.get("/user/:id", getUser); //funciona 😃
router.get("/verificacion", verificarToken); //funciona 😃
router.get("/confirmar/:token", verificarEmail); //funciona 😃

router.post("/emailConfirmado", emailConfirmado); //funciona 😃
router.post("/user", createUser); //funciona 😃
router.post("/user/login", inciarSesion); //funciona 😃
router.post("/user/logout", cerrarsSesion); //funciona 😃

router.put("/user/:id", updateUsuario); //funciona 😃
router.delete("/users/:id", deleteUsuario); //funciona 😃

export default router;
