import {
  allServicesUser,
  getUserInfo,
  getUserRemindersList,
  get_history_signes_visitor,
  get_history_signes_visitor_user,
  get_service_user,
  get_signes,
  search_users,
} from "../../../controllers";
import { authentication } from "../../middlewares/middlewares";

const userGetList = [
  {
    route: "/get-active-user-services",
    middlewares: authentication,
    function: get_service_user,
  },

  {
    route: "/allServicesUser",
    middlewares: authentication,
    function: allServicesUser,
    
  },

  {
    route: "/history-vita-signes",
    middlewares: authentication,
    function: get_history_signes_visitor,
  },
  {
    route: "/history-vital-signes-user",
    middlewares: authentication,
    function: get_history_signes_visitor_user,
  },

  {
    route: "/get-signes",
    middlewares: authentication,
    function: get_signes,
  },
  {
    route: "/search-users",
    middlewares: authentication,
    function: search_users,
  },
  {
    route: "/user-reminder-ist",
    middlewares: authentication,
    function: getUserRemindersList,
  },
  {
    route: "/user-info",
    middlewares: authentication,
    function: getUserInfo,
  },
];

export { userGetList };
