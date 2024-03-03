"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_all_users = exports.delete_user = void 0;
const db_1 = require("../../db/db");
// users
const delete_user = (req, res) => {
    const { id } = req.params;
    console.log(id);
    // Verificar si el ID proporcionado es válido (puedes agregar más validaciones según tus necesidades)
    if (!id) {
        return res.status(400).json({ error: "ID de usuario no proporcionado." });
    }
    // Ejecutar la consulta SQL para obtener el nombre del usuario por ID
    const selectQuery = "SELECT name FROM usuarios WHERE id_usuario = ?";
    db_1.user_db.get(selectQuery, [id], (err, row) => {
        if (err) {
            console.error("Error al obtener el usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
        if (!row) {
            // Usuario no encontrado
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        // Guardar el nombre del usuario antes de eliminarlo
        const userName = row.name;
        // Ejecutar la consulta SQL para eliminar el usuario por ID
        const deleteQuery = "DELETE FROM usuarios WHERE id_usuario = ?";
        db_1.user_db.run(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) {
                console.error("Error al eliminar el usuario:", deleteErr.message);
                return res
                    .status(500)
                    .json({ error: "Error interno del servidor al eliminar." });
            }
            // Éxito al eliminar el usuario
            return res.json({ success: true, deletedUserName: userName });
        });
    });
};
exports.delete_user = delete_user;
const delete_all_users = (req, res) => {
    // Ejecutar la consulta SQL para eliminar todos los usuarios
    const deleteQuery = "DELETE FROM usuarios";
    db_1.user_db.run(deleteQuery, (err) => {
        if (err) {
            console.error("Error al eliminar todos los usuarios:", err.message);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
        // Éxito al eliminar todos los usuarios
        return res.status(200).json({ success: true });
    });
};
exports.delete_all_users = delete_all_users;
