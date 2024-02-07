"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data_db = exports.user_db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const user_db = new sqlite3_1.default.Database("./src/db/db_users.db");
exports.user_db = user_db;
const data_db = new sqlite3_1.default.Database("./src/db/dta.db");
exports.data_db = data_db;
