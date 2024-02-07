import "dotenv/config";
import express from "express";
import cors from "cors";
import rt from "./routes/routes";
import morgan from "morgan";
import adm_rt from "./admin/routes/admin.Routes";
import { admin_permission_validate } from "./admin/middlewares/admin.middlewares";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(rt);
// admin
app.use("/ame_admin", admin_permission_validate, adm_rt);

export default app;
