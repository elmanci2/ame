"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Users = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const storage = "./src/db/db_users.db";
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage,
    logging: true,
});
exports.Users = sequelize.define("users", models_1.User_Model);
exports.Service = sequelize.define("service", models_1.service_Model);
const start_dev = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Autenticar la conexión a la base de datos
        // await sequelize.sync({ force: true });
        yield sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
exports.default = start_dev;
