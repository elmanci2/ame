"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilGet = void 0;
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../middlewares/middlewares");
const utilGet = [
    {
        route: "/get-countries",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_countries,
    },
    {
        route: "/get-state/:id",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_state,
    },
    {
        route: "/get-cities/:id",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_cities,
    },
    {
        route: "/get_document_type",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_document_type,
    },
    {
        route: "/get_eps",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_eps,
    },
    {
        route: "/get_medicaments",
        middlewares: middlewares_1.authentication,
        function: controllers_1.get_medicaments,
    },
];
exports.utilGet = utilGet;
