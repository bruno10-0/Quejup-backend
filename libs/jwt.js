import jwt from "jsonwebtoken"
import dotenv from "dotenv";
//variables de entorno desde el archivo .env
dotenv.config();

export function crearTokenAcceso(payload){
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err,token)=>{
                if(err)reject(err)
                resolve(token)
            }
        )
    })
}
