import { Router } from "express";
import controllers from "../controllers";
import { authentication } from "./middlewares/middlewares";

const {
  otp_validate,
  email_number_validation,
  create_new_user,
  get_countries,
  get_state,
  get_cities,
  get_document_type,
  login,
  search_users,
  generateVitalSignsUser,
  generateVitalSignsVisitor,
  get_history_signes_visitor,
  getUserInfo,
  get_signes,
  generateReminderVisitor,
  getVisitorReminderList,
  getUserRemindersList,
  generateReminderUser,
  deleteReminderUser,
  add_service,
  get_service,
  service_real_time,
} = controllers;
const rt = Router();

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
rt.post("/user-generate-vital-sing", authentication, generateVitalSignsUser);
rt.post(
  "/visitor-generate-vital-sing",
  authentication,
  generateVitalSignsVisitor
);

//POST
//reminder
rt.post("/visitor-add-reminder", authentication, generateReminderVisitor);
rt.post("/user-add-reminder", authentication, generateReminderUser);

//GET
rt.get("/visitor-reminder-list", getVisitorReminderList);
rt.get("/user-reminder-ist", authentication, getUserRemindersList);

//delete

rt.post("/user-delete-reminder", authentication, deleteReminderUser);

// GET
rt.get("/history-vita-signes", get_history_signes_visitor);
rt.get("/get-signes", authentication, get_signes);

//GET
// users
rt.get("/user-info", authentication, getUserInfo);

///POST
//service
rt.post("/add-service", /* authentication */ add_service);
rt.post("/get-service", authentication, get_service);
rt.post("/real-time-services", authentication, service_real_time);

export default rt;
