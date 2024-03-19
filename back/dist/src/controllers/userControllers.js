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
exports.updateUser = void 0;
const models_1 = require("../db/models");
const error_1 = require("../errors/error");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { user_id } = req.user;
    const newData = req.body;
    try {
        const user = yield models_1.Users.findOne({
            where: {
                id_usuario: user_id,
            },
        });
        if (!user) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        yield user.update(newData);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error updating user information:", error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.updateUser = updateUser;
