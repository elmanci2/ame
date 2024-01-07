import { addReminders } from "../../controllers/fixtures.js";
import { addGuardians, login, register } from "../../controllers/register.js";

// import json
import data from "../../../../data/countries.json" assert { type: "json" };
import bank from "../../../../data/bank.json" assert { type: "json" };
import eps from "../../../../data/eps.json" assert { type: "json" };
import Medicaments from "../../../../data/Medicaments.json" assert { type: "json" };

import account from "../../../../data/acautType.json" assert { type: "json" };
import { getStatesAnCountries } from "../../controllers/coutries.js";
import {
  addMedicamento,
  deleteMedicamento,
} from "../../controllers/app/user/medicamentos.js";
import {
  addService,
  cancelTechService,
  getServices,
  takeTechService,
} from "../../controllers/app/util/services/services.js";

export const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.user;
    },
    login,
    getCountries: () => data.countries,
    getAll_bank: () => bank.bank,
    getAccountType: () => account,
    getStatesAnCountries,
    getEps: () => eps,
    getMedicaments: () => Medicaments,
    getServices,
  },
  Mutation: {
    register,
    addGuardians,
    addReminders,
    addMedicamento,
    /* services  */
    addService,
    deleteMedicamento,
    takeTechService,
    cancelTechService,
  },
};
