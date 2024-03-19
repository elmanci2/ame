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
exports.sendNotification = void 0;
const axios_1 = __importDefault(require("axios"));
const serverKey = "AAAAM7V2EuY:APA91bEJEOQU1BZEiD7JDuXZ8tk_3jf5jA13f-b64sB_8O7eBmi4KPo2LZGc_JAM1eCUAbECDunFlOZ_DKx6qbAAcResUwZwgjsBY3mtI6HV2WrMy3HBrs0Ksbq197rmC3w7kOKZj6Vw";
const sendNotification = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fcmEndpoint = "https://fcm.googleapis.com/fcm/send";
        const data = {
            to: message === null || message === void 0 ? void 0 : message.to,
            notification: {
                title: message === null || message === void 0 ? void 0 : message.title,
                body: message === null || message === void 0 ? void 0 : message.body,
            },
            data: {
                custom_key: "valor_personalizado",
            },
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `key=${serverKey}`,
            },
        };
        const response = yield axios_1.default.post(fcmEndpoint, data, config);
        console.log("Notificaciones enviadas con éxito:", response.data);
    }
    catch (error) {
        console.error("Error al enviar las notificaciones:", error);
    }
});
exports.sendNotification = sendNotification;
