"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceGet = void 0;
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../middlewares/middlewares");
const serviceGet = [
    {
        route: "/visitor-reminder-list",
        middlewares: middlewares_1.next,
        function: controllers_1.getVisitorReminderList,
    },
    {
        route: "/get-active-services",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_active_service,
    },
    {
        route: "/get-service-info",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_service_info,
    },
    {
        route: "/get_active_service_delivery_and_medical",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_active_service_delivery_and_medical,
    },
];
exports.serviceGet = serviceGet;
