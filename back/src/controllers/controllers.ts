/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
/* import { generateOTP } from "./util/util";
import { sendSMS } from "../services/sms/sms"; */
import { allQueryAsync, queryAsync } from "../db/util/util";
import { user_db as db, data_db as data } from "../db/db";
import { v4 as uuidv4 } from "uuid";
import { BcryptDecrypt, BcryptEncrypt } from "./util/bcrypt";
import { generate_token } from "./util/token";
import { Reminder, VitalSigns } from "../types/types";
import { Errors } from "../errors/error";
import { Users } from "../db/models";
import { Op } from "sequelize";
import medications from "../data/medicametos.json";

const otp_validate = async (req: Request, res: Response) => {
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
};

const validate_email = async (
  email: string,
  phoneNumber: string
): Promise<string | null> => {
  try {
    const existingUserWithEmail = await Users.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUserWithEmail) {
      return "Correo electrónico ya registrado.";
    }

    const existingUserWithPhone = await Users.findOne({
      where: { phoneNumber },
    });

    if (existingUserWithPhone) {
      return "Número de teléfono ya registrado.";
    }

    return null; // No hay problemas de validación
  } catch (error) {
    console.error("Error de validación:", error);
    return "Error interno del servidor.";
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Campos 'email' y 'password' son requeridos");
    }

    const selectQuery =
      "SELECT email, password , type , id_usuario FROM users WHERE email = ?";

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

const email_number_validation = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  const validationError = await validate_email(email, phoneNumber);

  if (validationError) {
    return res.status(400).send(validationError);
  }

  return res.status(200).json({ success: true });
};

const create_new_user = async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = req.body;

    const user_id = uuidv4();

    const validationError = await validate_email(
      nuevoUsuario?.email,
      nuevoUsuario?.phoneNumber
    );

    if (validationError) {
      return res.status(400).send(validationError);
    }

    const password = await BcryptEncrypt(nuevoUsuario.password);

    const newUser = await Users.create({
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

    const result = await newUser.save();

    const tk = await generate_token(user_id);

    if (!tk || !result) res.status(500).send(Errors.internalError);

    res.status(201).json({ type: nuevoUsuario.type, ...tk });
  } catch (error) {
    res.status(500).send(Errors.internalError);
  }
};

const get_countries = async (req: Request, res: Response) => {
  const query = "SELECT value, label , code  FROM countries";
  const results = await allQueryAsync(data, query, []);
  res.send({
    countries: results,
  });
};

const get_eps = async (req: Request, res: Response) => {
  const query = "SELECT * FROM eps";
  const results = await allQueryAsync(data, query, []);
  res.send({
    eps: results,
  });
};

const get_medicaments = async (req: Request, res: Response) => {
  res.send({
    medications,
  });
};
/* 
const get_medicaments_info = async (req: Request, res: Response) => {
  res.send({
    medications,
  });
}; */

const get_state = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `SELECT value, label , st FROM states WHERE id_country = ${id};`;
  const results = await allQueryAsync(data, query, []);
  res.send({
    state: results,
  });
};

const get_cities = async (req: Request, res: Response) => {
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

const get_document_type = async (req: Request, res: Response) => {
  res.send(documentosIdentificación);
};

const search_users = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.term;

    /*     if (!searchTerm) {
      return res
        .status(400)
        .json({ error: "Se requiere un término de búsqueda" });
    } */

    const users = await Users.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { name: { [Op.like]: `%${searchTerm}%` } },
              { lastName: { [Op.like]: `%${searchTerm}%` } },
            ],
          },
          { type: "Usuario" },
        ],
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error en la función de búsqueda de usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// vital sing

const addVitalSigns = async (
  id: string,
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

const generateVitalSignsUser = async (req: Request, res: Response) => {
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

    const save = await addVitalSigns(user.user_id, data, user.user_id);

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

const generateVitalSignsVisitor = async (req: Request, res: Response) => {
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

const get_history_signes = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

const get_signes = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const user = req.user;
    if (!user) {
      return res.status(401).send(Errors.unauthorized);
    }

    const query =
      "SELECT * FROM vital_signes WHERE patient_id = ? ORDER BY creation_date DESC LIMIT 1";

    const results = await allQueryAsync(db, query, [user.user_id]);

    if (results.length === 0) {
      return res
        .status(404)
        .send("No se encontraron signos vitales para este usuario.");
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

const get_history_signes_visitor = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { id }: { id: string } = req.query;
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

const get_history_signes_visitor_user = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req.user;

    if (!user_id) {
      return res.status(401).send(Errors.unauthorized);
    }

    const query = "SELECT * FROM vital_signes WHERE patient_id = ?";

    const results = await allQueryAsync(db, query, [user_id]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

// reminder

const addReminder = async (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  id: string,
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

    db.run(query, params);

    return true;
  } catch (error) {
    throw new Error("Error al agregar el recordatorio");
  }
};

const generateReminderVisitor = async (req: Request, res: Response) => {
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

const generateReminderUser = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const user = req["user"];
    const data = req.body;

    if (!user.user_id || !data) {
      return res.status(400).send("Usuario o datos no válidos");
    }

    const save = await addReminder(user?.user_id, data, user?.user_id);

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

const deleteReminder = async (userId: number, reminderId: number) => {
  return new Promise((resolve, reject) => {
    // Ejecutar la consulta DELETE
    db.run(
      "DELETE FROM reminders WHERE patient_id = ? AND id = ?",
      [userId, reminderId],
      function (err) {
        if (err) {
          console.error("Error al eliminar el recordatorio:", err);
          reject(err);
        } else {
          // Comprobar si se eliminó alguna fila
          if (this.changes > 0) {
            resolve(true); // Se eliminó exitosamente
          } else {
            resolve(false); // No se encontró el recordatorio o no pertenece al usuario
          }
        }
      }
    );
  });
};

const deleteReminderUser = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const user = req["user"];
    const { id } = req.body; // Suponiendo que el ID del recordatorio se pasa como un parámetro en la URL

    console.log(id);

    if (!user.user_id || !id) {
      return res.status(400).send("Usuario o ID de recordatorio no válido");
    }

    const deleted = await deleteReminder(user.user_id, id);

    if (deleted) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(404)
        .send("El recordatorio no se encontró o no pertenece al usuario");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
};

const getUserRemindersList = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const user = req.user;
    if (!user) {
      return res.status(401).send(Errors.unauthorized);
    }

    const query = "SELECT * FROM reminders WHERE patient_id = ?";

    const results = await allQueryAsync(db, query, [user.user_id]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

const getVisitorReminderList = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { id }: { id: string } = req.query;

    console.log(id);

    if (!id) {
      return res.status(401).send(Errors.unauthorized);
    }

    const query = "SELECT * FROM reminders WHERE patient_id = ?";

    const results = await allQueryAsync(db, query, [id]);
    console.log(results);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

const getUserInfo = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req["user"];

    const user_info: any = await Users.findOne({
      where: { id_usuario: user_id },
    });
    res.status(200).send(user_info);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(Errors.internalError);
  }
};

export {
  otp_validate,
  email_number_validation,
  create_new_user,
  get_countries,
  get_eps,
  get_state,
  get_cities,
  get_document_type,
  login,
  generateVitalSignsUser,
  generateVitalSignsVisitor,
  search_users,
  get_history_signes_visitor,
  getUserInfo,
  get_signes,
  generateReminderVisitor,
  generateReminderUser,
  getUserRemindersList,
  getVisitorReminderList,
  deleteReminderUser,
  get_history_signes,
  get_history_signes_visitor_user,
  get_medicaments,
};
