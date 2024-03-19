"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilPost = void 0;
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../middlewares/middlewares");
const utilPost = [
    {
        route: "/otp",
        middlewares: middlewares_1.authentication,
        function: controllers_1.otp_validate,
    },
    {
        route: "/email_validate",
        middlewares: middlewares_1.authentication,
        function: controllers_1.email_number_validation,
    },
    {
        route: "/login",
        middlewares: middlewares_1.authentication,
        function: controllers_1.login,
    },
];
exports.utilPost = utilPost;
