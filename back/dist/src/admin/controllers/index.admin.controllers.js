"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controllers_1 = require("./admin.controllers");
const admin_controllers = {
    delete_user: admin_controllers_1.delete_user,
    delete_all_users: admin_controllers_1.delete_all_users,
};
exports.default = admin_controllers;
