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
exports.service_real_time = exports.get_service_info = exports.get_service = exports.cancel_service = exports.get_service_user = exports.get_active_service = exports.add_service = void 0;
const error_1 = require("../errors/error");
const models_1 = require("../db/models");
const Roles_1 = require("./util/Roles");
const storage_1 = require("../services/aws/storage");
const generate_unique_id_1 = __importDefault(require("generate-unique-id"));
const util_1 = require("./util/util");
const add_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const data = req.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req.user;
    console.log(data);
    const service_id = (0, generate_unique_id_1.default)({
        length: 100,
        useLetters: true,
    });
    if (!user_id || !data) {
        return res.status(400).send(error_1.Errors.internalError);
    }
    try {
        const user_info = yield models_1.Users.findOne({
            where: { id_usuario: user_id },
        });
        console.log(user_info);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const file_path = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.photo) === null || _b === void 0 ? void 0 : _b.tempFilePath;
        const photo = `${service_id}.jpg`;
        const service_data = Object.assign(Object.assign({}, data), { user_id, status: util_1.service_state.espera, photo, user_name: user_info === null || user_info === void 0 ? void 0 : user_info.lastName, user_photo: user_info === null || user_info === void 0 ? void 0 : user_info.photo });
        yield (0, storage_1.upload_file)(file_path, photo);
        const service = yield models_1.Service.create(Object.assign({}, service_data));
        const save = yield service.save();
        if (save) {
            return res.status(200).json({ success: true });
        }
    }
    catch (error) {
        console.error("Error while inserting service:", error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.add_service = add_service;
const get_active_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield models_1.Service.findAll({ where: { status: 0 } });
        if (!services) {
            return res.status(404).send("Servicio no encontrado");
        }
        return res.status(200).json(services);
    }
    catch (error) {
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_active_service = get_active_service;
const get_service_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req.user;
    try {
        const services = yield models_1.Service.findAll({
            where: { user_id, canceled: false },
        });
        if (!services) {
            return res.status(404).send("Servicio no encontrado");
        }
        return res.status(200).json(services);
    }
    catch (error) {
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_service_user = get_service_user;
const cancel_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(400).send(error_1.Errors.unauthorized);
    }
    try {
        // Buscar el servicio por su ID
        const service = yield models_1.Service.findOne({ where: { id } });
        // Verificar si el servicio fue encontrado
        if (!service) {
            return res.status(404).send("Servicio no encontrado");
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.canceled = true;
        // Guardar los cambios en la base de datos
        yield service.save();
        // Enviar una respuesta exitosa
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error al cancelar el servicio:", error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.cancel_service = cancel_service;
// get service
const get_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const location = req.body;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { user_id, type } = req.user;
        if (!id || user_id || type) {
            return res.status(400).send(error_1.Errors.unauthorized);
        }
        // Busca el servicio por su ID
        const service = yield models_1.Service.findOne({ where: { id } });
        if (!service) {
            return res.status(404).send("Servicio no encontrado");
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.type = type === Roles_1.user_roles.delivery ? 1 : 2;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.get_service_id = user_id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.location = JSON.stringify(location);
        yield service.save();
        return res.status(200).json({ service });
    }
    catch (error) {
        console.error("Error al obtener el servicio:", error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_service = get_service;
const get_service_info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send(error_1.Errors.unauthorized);
    }
    try {
        const service = yield models_1.Service.findOne({ where: { id } });
        if (!service) {
            return res.status(404).send("Servicio no encontrado");
        }
        res.status(200).json(service);
    }
    catch (error) {
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_service_info = get_service_info;
const service_real_time = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, id } = req.body;
    try {
        const service = yield models_1.Service.findOne({ where: { id } });
        if (!service) {
            return res.status(404).send("Servicio no encontrado");
        }
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.location = JSON.stringify(location);
        yield (service === null || service === void 0 ? void 0 : service.save());
    }
    catch (error) {
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.service_real_time = service_real_time;
