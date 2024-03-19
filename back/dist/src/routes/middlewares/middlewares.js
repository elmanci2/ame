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
Object.defineProperty(exports, "__esModule", { value: true });
exports.next = exports.authentication = void 0;
const error_1 = require("../../errors/error");
const token_1 = require("../../controllers/util/token");
function authentication(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token = req.headers["tk"];
        const tk = JSON.parse(token);
        if (!tk.tk) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        const decoded = yield (0, token_1.verify_Token)((_a = tk === null || tk === void 0 ? void 0 : tk.tk) === null || _a === void 0 ? void 0 : _a.substring(7));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        req["user"] = decoded;
        next();
    });
}
exports.authentication = authentication;
const next = (req, res, next) => {
    next();
};
exports.next = next;
