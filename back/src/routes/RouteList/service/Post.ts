/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  add_service,
  cancel_service,
  confirme_Service,
  confirme_Service_delivery_adn_medica,
  generateReminderVisitor,
  generateVitalSignsVisitor,
  get_service,
  service_real_time,
} from "../../../controllers";
import { authentication, next } from "../../middlewares/middlewares";

const servicePostList = [
  {
    route: "/visitor-generate-vital-sing",
    middlewares: authentication,
    function: generateVitalSignsVisitor,
  },

  {
    route: "/cancel-service-user",
    middlewares: next,
    function: cancel_service,
  },
  {
    route: "/visitor-add-reminder",
    middlewares: authentication,
    function: generateReminderVisitor,
  },

  {
    route: "/add-service",
    middlewares: authentication,
    function: add_service,
  },
  {
    route: "/get-service",
    middlewares: authentication,
    function: get_service,
  },
  {
    route: "/real-time-services",
    middlewares: authentication,
    function: service_real_time,
  },

  {
    route: "/confirme-Service",
    middlewares: authentication,
    function: confirme_Service,
  },

  {
    route: "/confirme-Service_delivery-adn_medica",
    middlewares: authentication,
    function: confirme_Service_delivery_adn_medica,
  },
];

export { servicePostList };
