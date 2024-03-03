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
exports.getUserInfo = exports.getVisitorReminderList = exports.getUserRemindersList = exports.deleteReminderUser = exports.deleteReminder = exports.generateReminderUser = exports.generateReminderVisitor = exports.get_history_signes_visitor = exports.get_signes = exports.get_history_signes = exports.generateVitalSignsVisitor = exports.generateVitalSignsUser = exports.addVitalSigns = exports.search_users = exports.get_document_type = exports.get_cities = exports.get_state = exports.get_countries = exports.create_new_user = exports.email_number_validation = exports.login = exports.validate_email = exports.otp_validate = void 0;
/* import { generateOTP } from "./util/util";
import { sendSMS } from "../services/sms/sms"; */
const util_1 = require("../db/util/util");
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
const bcrypt_1 = require("./util/bcrypt");
const token_1 = require("./util/token");
const error_1 = require("../errors/error");
const models_1 = require("../db/models");
const otp_validate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*   const otp = generateOTP();
    const { phone } = req.body;
    console.log(otp);
    
    await sendSMS({
      to: phone,
      body: `su código de validación de ame es: ${otp}`,
    });  */
    res.send({
        otp: "0000",
    });
});
exports.otp_validate = otp_validate;
const validate_email = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUserWithEmail = yield models_1.Users.findOne({
            where: { email: email.toLowerCase() },
        });
        if (existingUserWithEmail) {
            return "Correo electrónico ya registrado.";
        }
        const existingUserWithPhone = yield models_1.Users.findOne({
            where: { phoneNumber },
        });
        if (existingUserWithPhone) {
            return "Número de teléfono ya registrado.";
        }
        return null; // No hay problemas de validación
    }
    catch (error) {
        console.error("Error de validación:", error);
        return "Error interno del servidor.";
    }
});
exports.validate_email = validate_email;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Campos 'email' y 'password' son requeridos");
        }
        const selectQuery = "SELECT email, password , type , id_usuario FROM usuarios WHERE email = ?";
        const search_user = yield (0, util_1.queryAsync)(db_1.user_db, selectQuery, [
            email.toLowerCase(),
        ]);
        if (search_user) {
            const check_password = yield (0, bcrypt_1.BcryptDecrypt)(search_user.password, password);
            if (check_password) {
                const tk = yield (0, token_1.generate_token)(search_user === null || search_user === void 0 ? void 0 : search_user.id_usuario);
                if (!tk) {
                    return res
                        .status(500)
                        .set("Error interno del servidor al generar token");
                }
                return res.status(200).json(Object.assign({ type: search_user.type }, tk));
            }
            else {
                return res.status(400).send("Credenciales incorrectas");
            }
        }
        else {
            return res.status(404).send("Usuario no encontrado");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error interno del servidor");
    }
});
exports.login = login;
const email_number_validation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = req.body;
    const validationError = yield (0, exports.validate_email)(email, phoneNumber);
    if (validationError) {
        return res.status(400).send(validationError);
    }
    return res.status(200).json({ success: true });
});
exports.email_number_validation = email_number_validation;
const create_new_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoUsuario = req.body;
        const user_id = (0, uuid_1.v4)();
        const validationError = yield (0, exports.validate_email)(nuevoUsuario === null || nuevoUsuario === void 0 ? void 0 : nuevoUsuario.email, nuevoUsuario === null || nuevoUsuario === void 0 ? void 0 : nuevoUsuario.phoneNumber);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        const password = yield (0, bcrypt_1.BcryptEncrypt)(nuevoUsuario.password);
        const newUser = yield models_1.Users.create({
            id_usuario: user_id,
            address: nuevoUsuario.address,
            barrio: nuevoUsuario.barrio,
            city: nuevoUsuario.city,
            country: nuevoUsuario.country,
            date: nuevoUsuario.date,
            document: nuevoUsuario.document,
            documentType: nuevoUsuario.documentType,
            email: nuevoUsuario.email.toLowerCase(),
            lastName: nuevoUsuario.lasName,
            name: nuevoUsuario.name,
            password,
            phoneNumber: nuevoUsuario.phoneNumber,
            state: nuevoUsuario.state,
            verified: nuevoUsuario.verified || 0,
            active: nuevoUsuario.active || 1,
            photo: nuevoUsuario.photo || null,
            type: nuevoUsuario.type,
            firebase_tk: nuevoUsuario.firebase_tk,
        });
        console.log(nuevoUsuario);
        const result = yield newUser.save();
        const tk = yield (0, token_1.generate_token)(user_id);
        if (!tk || !result)
            res.status(500).send(error_1.Errors.internalError);
        res.status(201).json(Object.assign({ type: nuevoUsuario.type }, tk));
    }
    catch (error) {
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.create_new_user = create_new_user;
const get_countries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT value, label , code  FROM countries";
    const results = yield (0, util_1.allQueryAsync)(db_1.data_db, query, []);
    res.send({
        countries: results,
    });
});
exports.get_countries = get_countries;
const get_state = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT value, label , st FROM states WHERE id_country = ${id};`;
    const results = yield (0, util_1.allQueryAsync)(db_1.data_db, query, []);
    res.send({
        state: results,
    });
});
exports.get_state = get_state;
const get_cities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT value, cit , label FROM cities WHERE id_state = ${id};`;
    const results = yield (0, util_1.allQueryAsync)(db_1.data_db, query, []);
    res.send({
        cities: results,
    });
});
exports.get_cities = get_cities;
const documentosIdentificación = [
    {
        label: "Cédula de Ciudadanía",
        value: "CC",
        descripcion: "Documento principal para ciudadanos colombianos.",
        requisitos: [
            "Ser mayor de 18 años",
            "Trámite en la Registraduría Nacional",
        ],
    },
    {
        label: "Tarjeta de Identidad",
        value: "TI",
        descripcion: "Documento para menores de 18 años.",
        requisitos: [
            "Ser menor de 18 años",
            "Trámite en la Registraduría Nacional",
        ],
    },
    {
        label: "Pasaporte",
        value: "Pasaporte",
        descripcion: "Documento para viajes internacionales.",
        requisitos: ["Trámite en la Cancillería"],
    },
    {
        label: "Registro Civil de Nacimiento",
        value: "Registro Civil",
        descripcion: "Certificado de nacimiento oficial.",
        requisitos: ["Registro en la notaría o hospital de nacimiento"],
    },
    {
        label: "Carné de Extranjería",
        value: "Carné de Extranjería",
        descripcion: "Documento para extranjeros residentes en Colombia.",
        requisitos: ["Trámite en Migración Colombia"],
    },
    {
        label: "Tarjeta de Tránsito",
        value: "Tarjeta de Tránsito",
        descripcion: "Documento para personas temporales en el país.",
        requisitos: ["Trámite en la Registraduría Nacional"],
    },
];
const get_document_type = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(documentosIdentificación);
});
exports.get_document_type = get_document_type;
const search_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.term;
        if (!searchTerm) {
            return res
                .status(400)
                .json({ error: "Se requiere un término de búsqueda" });
        }
        const searchQuery = `
      SELECT *
      FROM usuarios
      WHERE (name LIKE ? OR lastName LIKE ?) AND type = 'Usuario';
    `;
        const params = [`%${searchTerm}%`, `%${searchTerm}%`];
        // Ejecuta la consulta en la base de datos
        db_1.user_db.all(searchQuery, params, (err, rows) => {
            if (err) {
                console.error("Error al buscar usuarios:", err.message);
                return res.status(500).json({ error: "Error al buscar usuarios." });
            }
            res.status(200).json(rows); // Devuelve los resultados de la búsqueda
        });
    }
    catch (error) {
        console.error("Error en la función de búsqueda de usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.search_users = search_users;
// vital sing
const addVitalSigns = (id, vitalSigns, by) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !vitalSigns)
            throw new Error("parámetros inválidos");
        const { heart_rate, blood_pressure, blood_sugar_level, weight } = vitalSigns;
        const Query = `
  INSERT INTO vital_signes (
    creation_date,
    heart_rate,
    blood_pressure,
    blood_sugar_level,
    weight,
    patient_id,
    add_by
  ) VALUES (
    CURRENT_TIMESTAMP,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
  )
`;
        db_1.user_db.run(Query, [
            heart_rate,
            blood_pressure,
            blood_sugar_level,
            weight,
            id,
            by ? by : id,
        ]);
        return true;
    }
    catch (error) {
        if (!id || !vitalSigns)
            throw new Error("parámetros inválidos");
    }
});
exports.addVitalSigns = addVitalSigns;
const generateVitalSignsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req["user"];
        const data = req.body;
        if (!user || !user.user_id || !data) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid user or data 2" });
        }
        const save = yield (0, exports.addVitalSigns)(user.user_id, data);
        if (save) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(500).send("Failed to save vital signs");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.generateVitalSignsUser = generateVitalSignsUser;
const generateVitalSignsVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req["user"];
        const data = req.body;
        const { id } = req.query;
        console.log(id);
        if (!user.user_id || !data || !id) {
            return res.status(400).send("Usuario o datos no válidos");
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const save = yield (0, exports.addVitalSigns)(id, data, user === null || user === void 0 ? void 0 : user.user_id);
        if (save) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(500).send("Failed to save vital signs");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.generateVitalSignsVisitor = generateVitalSignsVisitor;
const get_history_signes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req.user;
        if (!user) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        const query = "SELECT * FROM vital_signes WHERE patient_id = ?";
        const results = yield (0, util_1.allQueryAsync)(db_1.data_db, query, [user.user_id]);
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_history_signes = get_history_signes;
const get_signes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req.user;
        if (!user) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        const query = "SELECT * FROM vital_signes WHERE patient_id = ? ORDER BY creation_date DESC LIMIT 1";
        const results = yield (0, util_1.allQueryAsync)(db_1.user_db, query, [user.user_id]);
        if (results.length === 0) {
            return res
                .status(404)
                .send("No se encontraron signos vitales para este usuario.");
        }
        res.status(200).json(results[0]);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_signes = get_signes;
const get_history_signes_visitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { id } = req.query;
        console.log(id);
        if (!id) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        const query = "SELECT * FROM vital_signes WHERE patient_id = ?";
        const results = yield (0, util_1.allQueryAsync)(db_1.user_db, query, [id]);
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.get_history_signes_visitor = get_history_signes_visitor;
// reminder
const addReminder = (
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
id, reminderData, by) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !reminderData) {
            throw new Error("Parámetros inválidos");
        }
        const { notification_id, mensaje, medicamento, dosis, unidad, type, color, date, time, repeat, formate, originalTime, } = reminderData;
        const query = `
      INSERT INTO reminders (
        creation_date,
        notification_id,
        mensaje,
        medicamento,
        dosis,
        unidad,
        type,
        color,
        date,
        time,
        repeat,
        formate,
        originalTime,
        patient_id,
        add_by
      ) VALUES (
        CURRENT_TIMESTAMP,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `;
        const params = [
            notification_id,
            mensaje,
            medicamento,
            dosis,
            unidad,
            type,
            color,
            date,
            time,
            repeat,
            formate,
            originalTime,
            id,
            by,
        ];
        db_1.user_db.run(query, params);
        return true;
    }
    catch (error) {
        throw new Error("Error al agregar el recordatorio");
    }
});
const generateReminderVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req["user"];
        const data = req.body;
        const { id } = req.query;
        if (!user.user_id || !data || !id) {
            return res.status(400).send("Usuario o datos no válidos");
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const save = yield addReminder(id, data, user === null || user === void 0 ? void 0 : user.user_id);
        if (save) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(500).send("Failed to save reminder");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.generateReminderVisitor = generateReminderVisitor;
const generateReminderUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req["user"];
        const data = req.body;
        if (!user.user_id || !data) {
            return res.status(400).send("Usuario o datos no válidos");
        }
        const save = yield addReminder(user === null || user === void 0 ? void 0 : user.user_id, data, user === null || user === void 0 ? void 0 : user.user_id);
        if (save) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(500).send("Failed to save reminder");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(error_1.Errors.internalError);
    }
});
exports.generateReminderUser = generateReminderUser;
const deleteReminder = (userId, reminderId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // Ejecutar la consulta DELETE
        db_1.user_db.run("DELETE FROM reminders WHERE patient_id = ? AND id = ?", [userId, reminderId], function (err) {
            if (err) {
                console.error("Error al eliminar el recordatorio:", err);
                reject(err);
            }
            else {
                // Comprobar si se eliminó alguna fila
                if (this.changes > 0) {
                    resolve(true); // Se eliminó exitosamente
                }
                else {
                    resolve(false); // No se encontró el recordatorio o no pertenece al usuario
                }
            }
        });
    });
});
exports.deleteReminder = deleteReminder;
const deleteReminderUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req["user"];
        const { id } = req.body; // Suponiendo que el ID del recordatorio se pasa como un parámetro en la URL
        console.log(id);
        if (!user.user_id || !id) {
            return res.status(400).send("Usuario o ID de recordatorio no válido");
        }
        const deleted = yield (0, exports.deleteReminder)(user.user_id, id);
        if (deleted) {
            return res.status(200).json({ success: true });
        }
        else {
            return res
                .status(404)
                .send("El recordatorio no se encontró o no pertenece al usuario");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error interno del servidor");
    }
});
exports.deleteReminderUser = deleteReminderUser;
const getUserRemindersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req.user;
        if (!user) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        const query = "SELECT * FROM reminders WHERE patient_id = ?";
        const results = yield (0, util_1.allQueryAsync)(db_1.user_db, query, [user.user_id]);
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.getUserRemindersList = getUserRemindersList;
const getVisitorReminderList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { id } = req.query;
        console.log(id);
        if (!id) {
            return res.status(401).send(error_1.Errors.unauthorized);
        }
        const query = "SELECT * FROM reminders WHERE patient_id = ?";
        const results = yield (0, util_1.allQueryAsync)(db_1.user_db, query, [id]);
        console.log(results);
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.getVisitorReminderList = getVisitorReminderList;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user = req["user"];
        const selectQuery = `SELECT * FROM usuarios WHERE id_usuario = ?`;
        const result = yield (0, util_1.queryAsync)(db_1.user_db, selectQuery, [user === null || user === void 0 ? void 0 : user.user_id]);
        res.status(200).send(result);
        return result;
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(error_1.Errors.internalError);
    }
});
exports.getUserInfo = getUserInfo;
