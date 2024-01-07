import { Router } from "express";
import { upload_image } from "./controllers/upload.js";
import upload_file from "../../services/upload/upload.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("hello word");
});

routes.post("/upload_image", upload_image);

// image url

routes.get("/view_image", (req, res) => {
  // Genera la URL de la imagen que deseas mostrar
  const imageName = "dc209d6f-d700-41c8-a151-96c0bc4baf53.png";
  const imageUrl = `/static/${imageName}`; // URL de la imagen

  // Envía la URL de la imagen como respuesta
  res.send(`<img src="${imageUrl}" alt="Imagen" />`);
});

routes.get("/countries", (req, res) => {
  return;
});

export default routes;
