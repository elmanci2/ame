import "dotenv/config";
import "./db/models";
import express from "express";
import cors from "cors";
import rt from "./routes/routes";
import morgan from "morgan";
import adm_rt from "./admin/routes/admin.Routes";
import fileUpload from "express-fileupload";

import { admin_permission_validate } from "./admin/middlewares/admin.middlewares";
import sequelize from "./db/models";

(async () => {
  await sequelize.sync();
})();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(rt);
// admin
app.use("/ame_admin", admin_permission_validate, adm_rt);

export default app;
