import {
  otp_validate,
  email_number_validation,
  create_new_user,
  get_countries,
  get_state,
  get_cities,
  get_document_type,
  login,
  generateVitalSignsUser,
  generateVitalSignsVisitor,
  search_users,
  get_history_signes_visitor,
  getUserInfo
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
  search_users,
  generateVitalSignsUser,
  generateVitalSignsVisitor,
  get_history_signes_visitor,
  getUserInfo,
  util: {
    generateOTP,
  },
};

export default controllers;
