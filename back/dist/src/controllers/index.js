"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const controllers2_1 = require("./controllers2");
const util_1 = require("./util/util");
const controllers = {
    get_signes: controllers_1.get_signes,
    get_cities: controllers_1.get_cities,
    otp_validate: controllers_1.otp_validate,
    email_number_validation: controllers_1.email_number_validation,
    create_new_user: controllers_1.create_new_user,
    get_state: controllers_1.get_state,
    get_countries: controllers_1.get_countries,
    get_document_type: controllers_1.get_document_type,
    login: controllers_1.login,
    search_users: controllers_1.search_users,
    generateVitalSignsUser: controllers_1.generateVitalSignsUser,
    generateVitalSignsVisitor: controllers_1.generateVitalSignsVisitor,
    get_history_signes_visitor: controllers_1.get_history_signes_visitor,
    getUserInfo: controllers_1.getUserInfo,
    generateReminderVisitor: controllers_1.generateReminderVisitor,
    getVisitorReminderList: controllers_1.getVisitorReminderList,
    generateReminderUser: controllers_1.generateReminderUser,
    getUserRemindersList: controllers_1.getUserRemindersList,
    deleteReminderUser: controllers_1.deleteReminderUser,
    add_service: controllers2_1.add_service,
    get_service: controllers2_1.get_service,
    service_real_time: controllers2_1.service_real_time,
    get_active_service: controllers2_1.get_active_service,
    get_service_user: controllers2_1.get_service_user,
    cancel_service: controllers2_1.cancel_service,
    get_service_info: controllers2_1.get_service_info,
    util: {
        generateOTP: util_1.generateOTP,
    },
};
exports.default = controllers;
