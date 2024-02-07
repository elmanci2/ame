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
exports.get_document_type = exports.get_cities = exports.get_state = exports.get_countries = exports.create_new_user = exports.email_number_validation = exports.otp_validate = void 0;
const util_1 = require("./util/util");
const sms_1 = require("../services/sms/sms");
const util_2 = require("../db/util/util");
const db_1 = require("../db/db");
//import { UserData } from "../types/types";
const uuid_1 = require("uuid");
const otp_validate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = (0, util_1.generateOTP)();
    const { phone } = req.body;
    console.log(phone);
    yield (0, sms_1.sendSMS)({
        to: phone,
        body: `su código de validación de ame es: ${otp}`,
    });
    res.send({
        otp,
    });
});
exports.otp_validate = otp_validate;
const email_number_validation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = req.body;
    try {
        const existingUserWithEmail = yield (0, util_2.queryAsync)(db_1.user_db, "SELECT email FROM usuarios WHERE email = ?", [email]);
        if (existingUserWithEmail) {
            return res
                .status(400)
                .json({ error: "Correo electrónico ya registrado." });
        }
        const existingUserWithPhone = yield (0, util_2.queryAsync)(db_1.user_db, "SELECT phoneNumber FROM usuarios WHERE phoneNumber = ?", [phoneNumber]);
        if (existingUserWithPhone) {
            return res
                .status(400)
                .json({ error: "Número de teléfono ya registrado." });
        }
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error de validación:", error.message);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});
exports.email_number_validation = email_number_validation;
const create_new_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoUsuario = req.body;
    console.log(nuevoUsuario);
    const insertQuery = `
  INSERT INTO usuarios (
      id_usuario, address, barrio, city, country, date, document,
      documentType, email, lastName, name, password, phoneNumber,
      state, verified, active, photo, type
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;
    // Determinar qué campo de apellido usar (lastName o lasName)
    const apellido = nuevoUsuario.lastName !== null
        ? nuevoUsuario.lastName
        : nuevoUsuario.lasName;
    const user_id = (0, uuid_1.v4)();
    // Parámetros para la consulta SQL
    const params = [
        user_id,
        nuevoUsuario.address,
        nuevoUsuario.barrio,
        nuevoUsuario.city,
        nuevoUsuario.country,
        nuevoUsuario.date,
        nuevoUsuario.document,
        nuevoUsuario.documentType,
        nuevoUsuario.email,
        apellido || null,
        nuevoUsuario.name,
        nuevoUsuario.password,
        nuevoUsuario.phoneNumber,
        nuevoUsuario.state,
        nuevoUsuario.verified || 0,
        nuevoUsuario.active || 1,
        nuevoUsuario.photo || null,
        nuevoUsuario.type || null,
    ];
    // Imprimir los parámetros antes de ejecutar la consulta
    console.log("Parámetros de la consulta:", params);
    // Ejecutar la consulta SQL para insertar un nuevo usuario
    db_1.user_db.run(insertQuery, params, (err) => {
        if (err) {
            console.error("Error al insertar el nuevo usuario:", err.message);
            res.status(500).send("Error al insertar el nuevo usuario.");
        }
        else {
            res.status(201).json({ success: true });
        }
    });
});
exports.create_new_user = create_new_user;
const get_countries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT value, label , code  FROM countries";
    const results = yield (0, util_2.allQueryAsync)(db_1.data_db, query, []);
    res.send({
        countries: results,
    });
});
exports.get_countries = get_countries;
const get_state = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT value, label , st FROM states WHERE id_country = ${id};`;
    const results = yield (0, util_2.allQueryAsync)(db_1.data_db, query, []);
    res.send({
        state: results,
    });
});
exports.get_state = get_state;
const get_cities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT value, cit , label FROM cities WHERE id_state = ${id};`;
    const results = yield (0, util_2.allQueryAsync)(db_1.data_db, query, []);
    res.send({
        cities: results,
    });
});
exports.get_cities = get_cities;
const documentosIdentificacion = [
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
    res.send(documentosIdentificacion);
});
exports.get_document_type = get_document_type;
