import multer from "multer";
import Jwt from "jsonwebtoken";
import { secret_word } from "../../constants/keys.js";
import { UserInputError } from "apollo-server-core";

const route = "src/public/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    console.log(file);
    if (ext === "pdf") {
      cb(null, route + "pdf");
      return;
    }
    cb(null, route + "img");
  },
  filename: async function (req, file, cb) {
    console.log(file);
    const token = req?.token;
    if (!token) throw new UserInputError("no tines permiso para eto");
    const { id } = Jwt.verify(token, secret_word);
    const ext = file.originalname.split(".").pop();
    cb(null, `${id}.${ext}`);
  },
});

const upload_file = multer({ storage });

export default upload_file;

/* 

import multer from "multer";



export async function upload_multer(phat, file_name) {


    const storage = multer.diskStorage({
        filename: function (req, file, cb) {
            const ext = file.originalname.split('.').pop()
            cb(null, `${file_name}.${ext}`)
        },

        destination: function (req, file, cb) {
            console.log(req.token);
            cb(null, phat)
        },

    })


    return multer({ storage: storage })

}



export default upload_multer

*/
