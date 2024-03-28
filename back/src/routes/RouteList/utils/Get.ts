import {
  get_cities,
  get_countries,
  get_document_type,
  get_eps,
  get_medicaments,
  get_state,
} from "../../../controllers";
import { authentication } from "../../middlewares/middlewares";

const utilGet = [
  {
    route: "/get-countries",
    middlewares: authentication,
    function: get_countries,
  },
  {
    route: "/get-state/:id",
    middlewares: authentication,
    function: get_state,
  },
  {
    route: "/get-cities/:id",
    middlewares: authentication,
    function: get_cities,
  },
  {
    route: "/get_document_type",
    middlewares: authentication,
    function: get_document_type,
  },

  {
    route: "/get_eps",
    middlewares: authentication,
    function: get_eps,
  },

  {
    route: "/get_medicaments",
    middlewares: authentication,
    function: get_medicaments,
  },
];

export { utilGet };
