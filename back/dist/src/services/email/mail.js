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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "velanovelasgratis@gmail.com",
        pass: "34F6285C7B27C2482F7A968EF4C0FB0E80C1",
    },
});
function sendEmail(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: options.from || "mancillaandres7@gmail.com",
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
                attachments: options.attachments,
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.response);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}
exports.sendEmail = sendEmail;
