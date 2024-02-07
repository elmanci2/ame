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
exports.sendSMS = void 0;
const twilio_1 = __importDefault(require("twilio"));
const twilioCredentials = {
    accountSid: "ACb93a5469a5f19b266605a1c440244670",
    authToken: "f96fb84d6248624e5c77b20aa079629b",
    twilioPhoneNumber: "+17658197039",
};
function sendSMS(smsData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountSid, authToken, twilioPhoneNumber } = twilioCredentials;
        const client = (0, twilio_1.default)(accountSid, authToken);
        try {
            const result = yield client.messages.create({
                body: smsData.body,
                from: twilioPhoneNumber,
                to: smsData.to,
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendSMS = sendSMS;
// Ejemplo de uso:
