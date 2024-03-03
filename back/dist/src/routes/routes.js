"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = require("./middlewares/middlewares");
const { otp_validate, email_number_validation, create_new_user, get_countries, get_state, get_cities, get_document_type, login, search_users, generateVitalSignsUser, generateVitalSignsVisitor, get_history_signes_visitor, getUserInfo, get_signes, generateReminderVisitor, getVisitorReminderList, getUserRemindersList, generateReminderUser, deleteReminderUser, add_service, get_service, service_real_time, get_active_service, get_service_user, cancel_service, get_service_info, } = controllers_1.default;
const rt = (0, express_1.Router)();
// multer
// GET
rt.get("/", (req, res) => {
    res.send("hello word");
    return;
});
rt.get("/get-countries", get_countries);
rt.get("/get-state/:id", get_state);
rt.get("/get-cities/:id", get_cities);
rt.get("/get_document_type", get_document_type);
rt.get("/search-users", search_users);
// POST
rt.post("/otp", otp_validate);
rt.post("/email_validate", email_number_validation);
rt.post("/create-user", create_new_user);
rt.post("/login", login);
// POST
// vital sing
rt.post("/user-generate-vital-sing", middlewares_1.authentication, generateVitalSignsUser);
rt.post("/visitor-generate-vital-sing", middlewares_1.authentication, generateVitalSignsVisitor);
//POST
//reminder
rt.post("/visitor-add-reminder", middlewares_1.authentication, generateReminderVisitor);
rt.post("/user-add-reminder", middlewares_1.authentication, generateReminderUser);
//GET
rt.get("/visitor-reminder-list", getVisitorReminderList);
rt.get("/user-reminder-ist", middlewares_1.authentication, getUserRemindersList);
//delete
rt.post("/user-delete-reminder", middlewares_1.authentication, deleteReminderUser);
// GET
rt.get("/history-vita-signes", get_history_signes_visitor);
rt.get("/get-signes", middlewares_1.authentication, get_signes);
//GET
// users
rt.get("/user-info", middlewares_1.authentication, getUserInfo);
///POST
//service
rt.post("/add-service", middlewares_1.authentication, add_service);
rt.post("/get-service", middlewares_1.authentication, get_service);
rt.post("/real-time-services", middlewares_1.authentication, service_real_time);
rt.post("/cancel-service-user", cancel_service);
// Get
rt.get("/get-active-services", get_active_service);
rt.get("/get-active-user-services", middlewares_1.authentication, get_service_user);
rt.get("/get-service-info", get_service_info);
exports.default = rt;
