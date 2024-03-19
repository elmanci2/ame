import {
  getUserInfo,
  getUserRemindersList,
  get_history_signes_visitor,
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
    route: "/history-vita-signes",
    middlewares: authentication,
    function: get_history_signes_visitor,
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
