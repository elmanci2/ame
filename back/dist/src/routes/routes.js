"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const { otp_validate, email_number_validation, create_new_user, get_countries, get_state, get_cities, get_document_type } = controllers_1.default;
const rt = (0, express_1.Router)();
// GET
rt.get("/", (req, res) => {
    res.send("hello word");
    return;
});
rt.get("/get-countries", get_countries);
rt.get("/get-state/:id", get_state);
rt.get("/get-cities/:id", get_cities);
rt.get("/get_document_type", get_document_type);
// POST
rt.post("/otp", otp_validate);
rt.post("/email_validate", email_number_validation);
rt.post("/create-user", create_new_user);
exports.default = rt;
