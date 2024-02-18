import { Request, Response } from "express";
import { generateOTP } from "./util/util";
import { sendSMS } from "../services/sms/sms";
import { allQueryAsync, queryAsync } from "../db/util/util";
import { user_db as db, data_db as data } from "../db/db";
import { v4 as uuidv4 } from "uuid";
import { BcryptDecrypt, BcryptEncrypt } from "./util/bcrypt";
import { generate_token } from "./util/token";
import { Reminder, VitalSigns } from "../types/types";
import { Errors } from "../errors/error";

const user_id = uuidv4();

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

export const validate_email = async (
  email: string,
  phoneNumber: string
): Promise<string | null> => {
  try {
    const existingUserWithEmail = await queryAsync(
      db,
      "SELECT email FROM usuarios WHERE email = ?",
      [email.toLowerCase()]
    );

    if (existingUserWithEmail) {
      return "Correo electrónico ya registrado.";
    }

    const existingUserWithPhone = await queryAsync(
      db,
      "SELECT phoneNumber FROM usuarios WHERE phoneNumber = ?",
      [phoneNumber]
    );

    if (existingUserWithPhone) {
      return "Número de teléfono ya registrado.";
    }

    return null; // No hay problemas de validación
  } catch (error: any) {
    console.error("Error de validación:", error.message);
    return "Error interno del servidor.";
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Campos 'email' y 'password' son requeridos");
    }

    const selectQuery =
      "SELECT email, password , type , id_usuario FROM usuarios WHERE email = ?";

    const search_user = await queryAsync(db, selectQuery, [
      email.toLowerCase(),
    ]);

    if (search_user) {
      const check_password = await BcryptDecrypt(
        search_user.password,
        password
      );

      if (check_password) {
        const tk = await generate_token(search_user?.id_usuario);

        if (!tk) {
          return res
            .status(500)
            .set("Error interno del servidor al generar token");
        }
        return res.status(200).json({ type: search_user.type, ...tk });
      } else {
        return res.status(400).send("Credenciales incorrectas");
      }
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
};

export const email_number_validation = async (
  req: Request | any,
  res: Response | any
) => {
  const { email, phoneNumber } = req.body;

  const validationError = await validate_email(email, phoneNumber);

  if (validationError) {
    return res.status(400).send(validationError);
  }

  return res.status(200).json({ success: true });
};

export const create_new_user = async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = req.body;
    const insertQuery = `
  INSERT INTO usuarios (
      id_usuario, address, barrio, city, country, date, document,
      documentType, email, lastName, name, password, phoneNumber,
      state, verified, active, photo, type
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

    const validationError = await validate_email(
      nuevoUsuario?.email,
      nuevoUsuario?.phoneNumber
    );

    if (validationError) {
      return res.status(400).send(validationError);
    }

    // Determinar qué campo de apellido usar (lastName o lasName)
    const apellido =
      nuevoUsuario.lastName !== null
        ? nuevoUsuario.lastName
        : nuevoUsuario.lasName;

    const password = await BcryptEncrypt(nuevoUsuario.password);

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
      nuevoUsuario.email.toLowerCase(),
      apellido || null,
      nuevoUsuario.name,
      password,
      nuevoUsuario.phoneNumber,
      nuevoUsuario.state,
      nuevoUsuario.verified || 0,
      nuevoUsuario.active || 1,
      nuevoUsuario.photo || null,
      nuevoUsuario.type,
    ];

    const tk = await generate_token(user_id);

    if (!tk) res.status(500).send("internal server  error");

    db.run(insertQuery, params, (err) => {
      if (err) {
        console.error("Error al insertar el nuevo usuario:", err.message);
        res.status(500).json("Error al insertar el nuevo usuario.");
      } else {
        res.status(201).json({ type: nuevoUsuario.type, ...tk });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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

export const get_document_type = async (req: Request, res: Response) => {
  res.send(documentosIdentificación);
};

export const search_users = async (req: Request, res: Response) => {
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
    db.all(searchQuery, params, (err, rows) => {
      if (err) {
        console.error("Error al buscar usuarios:", err.message);
        return res.status(500).json({ error: "Error al buscar usuarios." });
      }

      res.status(200).json(rows); // Devuelve los resultados de la búsqueda
    });
  } catch (error) {
    console.error("Error en la función de búsqueda de usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// vital sing

export const addVitalSigns = async (
  id: string | any,
  vitalSigns: VitalSigns,
  by?: string
) => {
  try {
    if (!id || !vitalSigns) throw new Error("parámetros inválidos");

    const { heart_rate, blood_pressure, blood_sugar_level, weight } =
      vitalSigns;

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

    db.run(Query, [
      heart_rate,
      blood_pressure,
      blood_sugar_level,
      weight,
      id,
      by ? by : id,
    ]);

    return true;
  } catch (error) {
    if (!id || !vitalSigns) throw new Error("parámetros inválidos");
  }
};

export const generateVitalSignsUser = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req["user"];
    const data = req.body;

    if (!user || !user.user_id || !data) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user or data 2" });
    }

    const save = await addVitalSigns(user.user_id, data);

    if (save) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).send("Failed to save vital signs");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(Errors.internalError);
  }
};

export const generateVitalSignsVisitor = async (
  req: Request,
  res: Response
) => {
  try {
    //@ts-ignore
    const user = req["user"];
    const data = req.body;
    const { id } = req.query;
    console.log(id);

    if (!user.user_id || !data || !id) {
      return res.status(400).send("Usuario o datos no válidos");
    }

    const save = await addVitalSigns(id, data, user?.user_id);

    if (save) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).send("Failed to save vital signs");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(Errors.internalError);
  }
};

export const get_history_signes = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    if (!user) {
      return res.status(401).send(Errors.unauthorized);
    }

    const query = "SELECT * FROM vital_signes WHERE patient_id = ?";

    const results = await allQueryAsync(data, query, [user.user_id]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

export const get_history_signes_visitor = async (
  req: Request,
  res: Response
) => {
  try {
    //@ts-ignore
    const { id } = req.query;
    console.log(id);

    if (!id) {
      return res.status(401).send(Errors.unauthorized);
    }

    const query = "SELECT * FROM vital_signes WHERE patient_id = ?";

    const results = await allQueryAsync(db, query, [id]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

// reminder

const addReminder = async (
  id: string | any,
  reminderData: Reminder,
  by?: string
) => {
  try {
    if (!id || !reminderData) {
      throw new Error("Parámetros inválidos");
    }

    const {
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
    } = reminderData;

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

    db.run(query, [
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
      by || id,
    ]);

    return true;
  } catch (error) {
    throw new Error("Error al agregar el recordatorio");
  }
};

export const generateReminderVisitor = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req["user"];
    const data = req.body;
    const { id } = req.query;
    console.log(id);

    if (!user.user_id || !data || !id) {
      return res.status(400).send("Usuario o datos no válidos");
    }

    const save = await addReminder(id, data, user?.user_id);

    if (save) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).send("Failed to save reminder");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(Errors.internalError);
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req["user"];
    return user;
  } catch (error) {}
};
