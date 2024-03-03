"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_admin_controllers_1 = __importDefault(require("../controllers/index.admin.controllers"));
const { delete_user, delete_all_users } = index_admin_controllers_1.default;
const adm_rt = (0, express_1.Router)();
adm_rt.get("/delete-user/:id", delete_user);
adm_rt.get("/delete-all-users", delete_all_users);
exports.default = adm_rt;
