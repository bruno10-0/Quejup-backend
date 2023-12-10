import { Router} from "express";

import {
    getPublicacion,
    getQuejasInfraestructura,
    getQuejasComunitario,
    getQuejasServicio,
    getUbicacion,
    getQuejasOtro
} from "../controllers/publicacion.controllers.js"

const router = Router();

router.get("/publicacion",getPublicacion);
router.get("/publicacionInfraestuctura",getQuejasInfraestructura);
router.get("/publicacionComunitario",getQuejasComunitario);
router.get("/publicacionServicios",getQuejasServicio);
router.get("/publicacionOtro",getQuejasOtro);

router.get("/getUbicacion",getUbicacion);

export default router;