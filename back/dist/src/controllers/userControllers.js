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
exports.allServicesUser = exports.updateUser = void 0;
const models_1 = require("../db/models");
const error_1 = require("../errors/error");
const storage_1 = require("../services/aws/storage");
const uuid_1 = require("uuid");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const phone_id = (0, uuid_1.v4)();
    //@ts-ignore
    const { user_id } = req.user;
    const newData = req.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const file_path = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.photo) === null || _b === void 0 ? void 0 : _b.tempFilePath;
    try {
        const user = yield models_1.Users.findOne({
            where: {
                id_usuario: user_id,
            },
        });
        const photo = file_path ? `${phone_id}.jpg` : null;
        if (file_path) {
            yield (0, storage_1.upload_file)(file_path, photo);
        }
        if (!user) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        yield user.update(Object.assign(Object.assign({}, newData), { photo }));
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error updating user information:", error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.updateUser = updateUser;
const allServicesUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { user_id } = req.user;
    try {
        const services = yield models_1.Service.findAll({
            where: {
                user_id,
            },
        });
        res.status(200).json(services);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.allServicesUser = allServicesUser;
