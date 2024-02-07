"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const util_1 = require("./util/util");
const controllers = {
    get_cities: controllers_1.get_cities,
    otp_validate: controllers_1.otp_validate,
    email_number_validation: controllers_1.email_number_validation,
    create_new_user: controllers_1.create_new_user,
    get_state: controllers_1.get_state,
    get_countries: controllers_1.get_countries,
    get_document_type: controllers_1.get_document_type,
    util: {
        generateOTP: util_1.generateOTP,
    },
};
exports.default = controllers;
