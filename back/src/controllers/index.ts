import {
  otp_validate,
  email_number_validation,
  create_new_user,
  get_countries,
  get_state,
  get_cities,
  get_document_type,
  login
} from "./controllers";
import { generateOTP } from "./util/util";

const controllers = {
  get_cities,
  otp_validate,
  email_number_validation,
  create_new_user,
  get_state,
  get_countries,
  get_document_type,
  login,
  util: {
    generateOTP,
  },
};

export default controllers;
