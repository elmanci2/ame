"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const db_1 = require("../db");
function createUser(userData) {
    // Validar que todos los campos obligatorios estén presentes
    const requiredFields = [
        "name",
        "lastname",
        "email",
        "password",
        "phoneNumber",
        "country",
        "city",
        "estado",
        "age",
        "fechaNacimiento",
        "photo",
    ];
    for (const field of requiredFields) {
        if (!(field in userData) ||
            //@ts-ignore
            userData[field] === null ||
            //@ts-ignore
            userData[field] === undefined) {
            console.error(`El campo "${field}" es obligatorio.`);
            return;
        }
    }
    // Verifica si el correo electrónico ya existe
    db_1.user_db.get("SELECT * FROM usuarios WHERE email = ?", [userData.email], (err, existingUserWithEmail) => {
        if (err) {
            console.error("Error al verificar el correo electrónico:", err.message);
            db_1.user_db.close();
            return;
        }
        if (existingUserWithEmail) {
            console.error("Ya existe un usuario con este correo electrónico.");
            db_1.user_db.close();
            return;
        }
        // Verifica si el número de teléfono ya existe
        db_1.user_db.get("SELECT * FROM usuarios WHERE phoneNumber = ?", [userData.phoneNumber], (err, existingUserWithPhone) => {
            if (err) {
                console.error("Error al verificar el número de teléfono:", err.message);
                db_1.user_db.close();
                return;
            }
            if (existingUserWithPhone) {
                console.error("Ya existe un usuario con este número de teléfono.");
                db_1.user_db.close();
                return;
            }
            // Inserta un nuevo usuario
            const insertQuery = `
          INSERT INTO usuarios (name, lastname, email, password, phoneNumber, country, city, estado, age, fechaNacimiento, photo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
            db_1.user_db.run(insertQuery, [
                userData.name,
                userData.lastname,
                userData.email,
                userData.password,
                userData.phoneNumber,
                userData.country,
                userData.city,
                userData.estado,
                userData.age,
                userData.fechaNacimiento,
                userData.photo,
            ], (err) => {
                if (err) {
                    console.error("Error al insertar usuario:", err.message);
                }
                else {
                    console.log("Usuario creado exitosamente.");
                }
                // Cierra la conexión con la base de datos después de realizar la inserción
                db_1.user_db.close();
            });
        });
    });
}
exports.createUser = createUser;
