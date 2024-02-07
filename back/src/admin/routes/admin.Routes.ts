import { Router } from "express";
import admin_controllers from "../controllers/index.admin.controllers";


const { delete_user, delete_all_users } = admin_controllers;

const adm_rt = Router();

adm_rt.get("/delete-user/:id", delete_user);

adm_rt.get("/delete-all-users", delete_all_users);
export default adm_rt;
