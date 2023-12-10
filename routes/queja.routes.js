import fileUpload from "express-fileupload";
import { Router} from "express";
import {autenticacion} from "../middleware/validarToken.js"
import { 
    getQuejas,
    getQueja,
    createQueja,
    updateQueja,
    deleteQueja
 } from "../controllers/queja.controllers.js";

const router = Router();

router.get("/quejas",autenticacion,getQuejas);//funciona 😃

router.get("/queja/:id",autenticacion,getQueja);//funciona 😃

router.post("/queja",fileUpload({useTempFiles : true,tempFileDir : '../imagenes'}),createQueja);//funciona 😃

router.put("/queja",autenticacion,updateQueja);//funciona 😃

router.delete("/queja/:id",autenticacion,deleteQueja);//funciona 😃



export default router;