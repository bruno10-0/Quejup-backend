import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
  });

export async function subirImagen(path){
    return await cloudinary.uploader.upload(path,{
        folder: "img"
    })
}



export async function borrarImagen(public_id){
    return await cloudinary.uploader.destroy(public_id)
}
