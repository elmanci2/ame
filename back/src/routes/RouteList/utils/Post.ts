import {
  email_number_validation,
  login,
  otp_validate,
} from "../../../controllers";
import { authentication } from "../../middlewares/middlewares";

const utilPost = [
  {
    route: "/otp",
    middlewares: authentication,
    function: otp_validate,
  },
  {
    route: "/email_validate",
    middlewares: authentication,
    function: email_number_validation,
  },
  {
    route: "/login",
    middlewares: authentication,
    function: login,
  },
];

export { utilPost };
