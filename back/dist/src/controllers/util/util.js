"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
exports.generateOTP = generateOTP;
