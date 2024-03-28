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
exports.confirme_Service = exports.get_active_service_delivery_and_medical = exports.confirme_Service_delivery_adn_medica = exports.get_service_info = exports.cancel_service = exports.get_service_user = exports.get_active_service = exports.service_real_time = exports.get_service = exports.add_service = void 0;
const error_1 = require("../errors/error");
const models_1 = require("../db/models");
const storage_1 = require("../services/aws/storage");
const generate_unique_id_1 = __importDefault(require("generate-unique-id"));
const util_1 = require("./util/util");
const fcm_1 = require("../services/firebase/fcm");
const Roles_1 = require("./util/Roles");
const add_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const data = req.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req.user;
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
        if ((data === null || data === void 0 ? void 0 : data.type) === 2) {
            const service_data = Object.assign(Object.assign({}, data), { user_id, status: util_1.service_state.espera, user_name: user_info === null || user_info === void 0 ? void 0 : user_info.lastName, user_photo: user_info === null || user_info === void 0 ? void 0 : user_info.photo });
            const service = yield models_1.Service.create(Object.assign({}, service_data));
            const save = yield service.save();
            if (save) {
                return res.status(200).json({ success: true });
            }
        }
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
    //@ts-ignore
    const { user_id } = req.user;
    try {
        const user = yield models_1.Users.findOne({
            where: {
                id_usuario: user_id,
            },
        });
        if (!user) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        //@ts-ignore
        const server_type = user.type === Roles_1.user_roles.delivery ? 1 : 2;
        const services = yield models_1.Service.findAll({
            where: {
                status: 0,
                canceled: false,
                incurred: false,
                type: server_type,
                completed: false,
            },
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
exports.get_active_service = get_active_service;
const get_service_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req.user;
    try {
        const services = yield models_1.Service.findAll({
            where: { user_id, canceled: false, completed: false },
        });
        if (!services || services.length === 0) {
            return res.status(201).json([]);
        }
        // Crear un array de promesas para las operaciones asincrónicas
        const promises = services.map((service) => __awaiter(void 0, void 0, void 0, function* () {
            if (service === null || service === void 0 ? void 0 : service.incurred) {
                const user = yield models_1.Users.findOne({
                    where: {
                        id_usuario: service === null || service === void 0 ? void 0 : service.get_service_id,
                    },
                });
                if (user) {
                    service.get_phone = user === null || user === void 0 ? void 0 : user.phoneNumber;
                    service.get_age = user === null || user === void 0 ? void 0 : user.date;
                }
            }
            return service;
        }));
        const updatedServices = yield Promise.all(promises);
        return res.status(200).json(updatedServices);
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
const confirme_Service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, start, observation } = req.body;
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
        //@ts-ignore
        service.completed = true;
        //@ts-ignore
        service.start = start;
        //@ts-ignore
        service.observation = observation !== null && observation !== void 0 ? observation : "";
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
exports.confirme_Service = confirme_Service;
const confirme_Service_delivery_adn_medica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //@ts-ignore
        service.incurred = false;
        yield service.save();
        // Enviar una respuesta exitosa
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error al cancelar el servicio:", error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.confirme_Service_delivery_adn_medica = confirme_Service_delivery_adn_medica;
// get service
const get_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const location = req.body;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { user_id } = req.user;
        if (!id) {
            return res.status(400).send(error_1.Errors.unauthorized);
        }
        // Busca el servicio por su ID
        const service = yield models_1.Service.findOne({ where: { id } });
        if (!service) {
            return res.status(404).send("Servicio no encontrado");
        }
        const user = yield models_1.Users.findOne({
            where: { id_usuario: service === null || service === void 0 ? void 0 : service.user_id },
        });
        const get = yield models_1.Users.findOne({
            where: { id_usuario: user_id },
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.get_service_id = user_id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.location = JSON.stringify(location);
        service.get_name = get.name;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        service.incurred = true;
        yield service.save();
        console.log(service);
        yield (0, fcm_1.sendNotification)({
            title: "servicio activo",
            body: `${service === null || service === void 0 ? void 0 : service.user_name} tu servicio fue tomado`,
            to: user === null || user === void 0 ? void 0 : user.firebase_tk,
        });
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
const get_active_service_delivery_and_medical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { user_id } = req.user;
    try {
        const service = yield models_1.Service.findOne({
            where: {
                get_service_id: user_id,
                completed: false,
                incurred: true,
                canceled: false,
            },
            order: [["createdAt", "DESC"]], // Ordenar por fecha de creación en orden descendente
        });
        if (service) {
            res.status(200).json(service);
        }
        else {
            res.status(200).json([]);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});
exports.get_active_service_delivery_and_medical = get_active_service_delivery_and_medical;
