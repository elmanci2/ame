import { Router } from "express";
import controllers from "../controllers";

const {
  otp_validate,
  email_number_validation,
  create_new_user,
  get_countries,
  get_state,
  get_cities,
  get_document_type,
  login,
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

// POST
rt.post("/otp", otp_validate);
rt.post("/email_validate", email_number_validation);
rt.post("/create-user", create_new_user);
rt.post("/login", login);

export default rt;
