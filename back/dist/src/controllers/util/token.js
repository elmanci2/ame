"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_Token = exports.generate_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const error_1 = require("../../errors/error");
const generate_token = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            throw new Error(error_1.Errors.serverError);
        const payload = {
            user_id: id,
        };
        const token = jsonwebtoken_1.default.sign(payload, config_1.config.jwt.secretKey);
        return {
            tk: `bearer ${token}`,
        };
    }
    catch (error) {
        // Handle errors
        console.error("Error generating token:", error.message);
        throw error;
    }
});
exports.generate_token = generate_token;
const verify_Token = (tk) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!tk)
            throw new Error(error_1.Errors.serverError);
        const user_id = jsonwebtoken_1.default.verify(tk, config_1.config.jwt.secretKey);
        return user_id;
    }
    catch (error) {
        throw new Error(error_1.Errors.serverError);
    }
});
exports.verify_Token = verify_Token;
