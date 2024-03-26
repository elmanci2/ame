"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGetList = void 0;
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../middlewares/middlewares");
const userGetList = [
    {
        route: "/get-active-user-services",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_service_user,
    },
    {
        route: "/allServicesUser",
        middlewares: middlewares_1.authentication,
        function: controllers_1.allServicesUser,
    },
    {
        route: "/history-vita-signes",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_history_signes_visitor,
    },
    {
        route: "/history-vital-signes-user",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_history_signes_visitor_user,
    },
    {
        route: "/get-signes",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_signes,
    },
    {
        route: "/search-users",
        middlewares: middlewares_1.authentication,
        function: controllers_1.search_users,
    },
    {
        route: "/user-reminder-ist",
        middlewares: middlewares_1.authentication,
        function: controllers_1.getUserRemindersList,
    },
    {
        route: "/user-info",
        middlewares: middlewares_1.authentication,
        function: controllers_1.getUserInfo,
    },
];
exports.userGetList = userGetList;
