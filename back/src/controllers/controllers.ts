import { Request, Response } from "express";
import { generateOTP } from "./util/util";
import { sendSMS } from "../services/sms/sms";
import { allQueryAsync, queryAsync } from "../db/util/util";
import { user_db as db, data_db as data } from "../db/db";
//import { UserData } from "../types/types";
import { v4 as uuidv4 } from "uuid";
export const otp_validate = async (req: Request, res: Response) => {
  const otp = generateOTP();
  const { phone } = req.body;
  console.log(phone);

  await sendSMS({
    to: phone,
    body: `su código de validación de ame es: ${otp}`,
  });
  res.send({
    otp,
  });
};

export const email_number_validation = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  try {
    const existingUserWithEmail = await queryAsync(
      db,
      "SELECT email FROM usuarios WHERE email = ?",
      [email]
    );

    if (existingUserWithEmail) {
      return res
        .status(400)
        .json({ error: "Correo electrónico ya registrado." });
    }

    const existingUserWithPhone = await queryAsync(
      db,
      "SELECT phoneNumber FROM usuarios WHERE phoneNumber = ?",
      [phoneNumber]
    );

    if (existingUserWithPhone) {
      return res
        .status(400)
        .json({ error: "Número de teléfono ya registrado." });
    }
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error de validación:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
export const create_new_user = async (req: Request, res: Response) => {
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
  const apellido =
    nuevoUsuario.lastName !== null
      ? nuevoUsuario.lastName
      : nuevoUsuario.lasName;

  const user_id = uuidv4();
  // Parámetros para la consulta SQL
  const params = [
    user_id, // Agregando el ID generado
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
  db.run(insertQuery, params, (err) => {
    if (err) {
      console.error("Error al insertar el nuevo usuario:", err.message);
      res.status(500).send("Error al insertar el nuevo usuario.");
    } else {
      res.status(201).json({ success: true });
    }
  });
};

export const get_countries = async (req: Request, res: Response) => {
  const query = "SELECT value, label , code  FROM countries";
  const results = await allQueryAsync(data, query, []);
  res.send({
    countries: results,
  });
};

export const get_state = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `SELECT value, label , st FROM states WHERE id_country = ${id};`;
  const results = await allQueryAsync(data, query, []);
  res.send({
    state: results,
  });
};

export const get_cities = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `SELECT value, cit , label FROM cities WHERE id_state = ${id};`;
  const results = await allQueryAsync(data, query, []);
  res.send({
    cities: results,
  });
};

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

export const get_document_type = async (req: Request, res: Response) => {
  res.send(documentosIdentificacion);
};
