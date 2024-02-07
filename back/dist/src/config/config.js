"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    port: {
        port: 3000,
    },
    sms: {
        accountSid: `${process.env.accountSid}`,
        authToken: `${process.env.authToken}`,
        phone: "+17658197039",
    },
};
