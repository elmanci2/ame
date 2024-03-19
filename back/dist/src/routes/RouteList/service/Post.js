"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicePostList = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../middlewares/middlewares");
const servicePostList = [
    {
        route: "/visitor-generate-vital-sing",
        middlewares: middlewares_1.authentication,
        function: controllers_1.generateVitalSignsVisitor,
    },
    {
        route: "/cancel-service-user",
        middlewares: middlewares_1.next,
        function: controllers_1.cancel_service,
    },
    {
        route: "/visitor-add-reminder",
        middlewares: middlewares_1.authentication,
        function: controllers_1.generateReminderVisitor,
    },
    {
        route: "/add-service",
        middlewares: middlewares_1.authentication,
        function: controllers_1.add_service,
    },
    {
        route: "/get-service",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_service,
    },
    {
        route: "/real-time-services",
        middlewares: middlewares_1.authentication,
        function: controllers_1.service_real_time,
    },
    {
        route: "/confirme-Service",
        middlewares: middlewares_1.authentication,
        function: controllers_1.confirme_Service,
    },
    {
        route: "/confirme-Service_delivery-adn_medica",
        middlewares: middlewares_1.authentication,
        function: controllers_1.confirme_Service_delivery_adn_medica,
    },
];
exports.servicePostList = servicePostList;
