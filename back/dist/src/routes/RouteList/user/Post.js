"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPostList = void 0;
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../middlewares/middlewares");
const userPostList = [
    {
        route: "/update-user-info",
        middlewares: middlewares_1.authentication,
        function: controllers_1.updateUser,
    },
    {
        route: "/user-delete-reminder",
        middlewares: middlewares_1.authentication,
        function: controllers_1.deleteReminderUser,
    },
    {
        route: "/user-generate-vital-sing",
        middlewares: middlewares_1.authentication,
        function: controllers_1.generateVitalSignsUser,
    },
    {
        route: "/user-add-reminder",
        middlewares: middlewares_1.authentication,
        function: controllers_1.generateReminderUser,
    },
    {
        route: "/create-user",
        middlewares: middlewares_1.next,
        function: controllers_1.create_new_user,
    },
];
exports.userPostList = userPostList;
