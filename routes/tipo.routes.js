import { Router} from "express";
import { 
    createTipo,
    getTipos,
    deleteTipo,
    updateTipo,
    getTipo,
 } from "../controllers/tipo.controllers.js";

const router = Router();

router.get("/tipos",getTipos);//funciona 😃
router.post("/tipo",createTipo);//funciona 😃
router.put("/tipo/:id",updateTipo);//funciona 😃
router.delete("/tipo/:id", deleteTipo);//funciona 😃 
router.get("/tipo/:id",getTipo);//funciona 😃 


export default router;