import {
  create_new_user,
  deleteReminderUser,
  generateReminderUser,
  generateVitalSignsUser,
  updateUser,
} from "../../../controllers";
import { authentication, next } from "../../middlewares/middlewares";

const userPostList = [
  {
    route: "/update-user-info",
    middlewares: authentication,
    function: updateUser,
  },
  {
    route: "/user-delete-reminder",
    middlewares: authentication,
    function: deleteReminderUser,
  },

  {
    route: "/user-generate-vital-sing",
    middlewares: authentication,
    function: generateVitalSignsUser,
  },
  {
    route: "/user-add-reminder",
    middlewares: authentication,
    function: generateReminderUser,
  },
  {
    route: "/create-user",
    middlewares: next,
    function: create_new_user,
  },
];

export { userPostList };
