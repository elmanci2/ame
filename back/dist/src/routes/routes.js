"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RouteList_1 = require("./RouteList");
const rt = (0, express_1.Router)();
// GET
rt.get("/", (req, res) => {
    res.send("hello word");
    return;
});
RouteList_1.userGetList.map((item) => rt.get(item.route, item.middlewares, item.function));
RouteList_1.userPostList.map((item) => rt.post(item.route, item.middlewares, item.function));
RouteList_1.utilGet.map((item) => rt.get(item === null || item === void 0 ? void 0 : item.route, item === null || item === void 0 ? void 0 : item.function));
RouteList_1.utilPost.map((item) => rt.post(item === null || item === void 0 ? void 0 : item.route, item === null || item === void 0 ? void 0 : item.function));
RouteList_1.servicePostList.map((item) => rt.post(item.route, item.middlewares, item.function));
RouteList_1.serviceGet.map((item) => rt.get(item.route, item.middlewares, item.function));
exports.default = rt;
/* rt.post(
  "/visitor-generate-vital-sing",
  authentication,
  generateVitalSignsVisitor
);
 */
//POST
//reminder
//GET
/* rt.get("/visitor-reminder-list", getVisitorReminderList);
rt.post("/cancel-service-user", cancel_service);
 */
// Get
/* rt.get("/get-active-services", get_active_service);
rt.get("/get-active-user-services", authentication, get_service_user);
rt.get("/get-service-info", get_service_info);
rt.get(
  "/get_active_service_delivery_and_medical",
  authentication,
  get_active_service_delivery_and_medical
); */
//  users
/* rt.get("/search-users", search_users);
rt.get("/user-reminder-ist", authentication, getUserRemindersList);
rt.get("/user-info", authentication, getUserInfo);
rt.get("/get-active-user-services", authentication, get_service_user); */
/* rt.post("/update-user-info", authentication, createUser);
rt.post("/create-user", create_new_user);
rt.post("/user-generate-vital-sing", authentication, generateVitalSignsUser);
rt.post("/user-add-reminder", authentication, generateReminderUser); */
/* rt.get("/get-countries", get_countries);
rt.get("/get-state/:id", get_state);
rt.get("/get-cities/:id", get_cities);
rt.get("/get_document_type", get_document_type);
 */
// POST
/* rt.post("/otp", otp_validate);
rt.post("/email_validate", email_number_validation);

rt.post("/login", login); */
// POST
// vital sing
//delete
/* rt.post("/user-delete-reminder", authentication, deleteReminderUser); */
// GET
/* rt.get("/history-vita-signes", get_history_signes_visitor);
rt.get("/get-signes", authentication, get_signes); */
//GET
// users
///POST
//service
/* rt.post("/add-service", authentication, add_service);
rt.post("/get-service", authentication, get_service);
rt.post("/real-time-services", authentication, service_real_time); */
