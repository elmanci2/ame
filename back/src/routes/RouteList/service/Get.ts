import {
  getVisitorReminderList,
  get_active_service,
  get_active_service_delivery_and_medical,
  get_service_info,
} from "../../../controllers";
import { authentication, next } from "../../middlewares/middlewares";

const serviceGet = [
  {
    route: "/visitor-reminder-list",
    middlewares: next,
    function: getVisitorReminderList,
  },
  {
    route: "/get-active-services",
    middlewares: authentication,
    function: get_active_service,
  },
  {
    route: "/get-service-info",
    middlewares: authentication,
    function: get_service_info,
  },
  {
    route: "/get_active_service_delivery_and_medical",
    middlewares: authentication,
    function: get_active_service_delivery_and_medical,
  },
];

export { serviceGet };
