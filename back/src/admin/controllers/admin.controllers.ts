import { Request, Response } from "express";
import { user_db as db } from "../../db/db";

// users
export const delete_user = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  // Verificar si el ID proporcionado es válido (puedes agregar más validaciones según tus necesidades)
  if (!id) {
    return res.status(400).json({ error: "ID de usuario no proporcionado." });
  }

  // Ejecutar la consulta SQL para obtener el nombre del usuario por ID
  const selectQuery = "SELECT name FROM usuarios WHERE id_usuario = ?";

  db.get(selectQuery, [id], (err: any, row: any) => {
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
    db.run(deleteQuery, [id], (deleteErr: any) => {
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

export const delete_all_users = (req: Request, res: Response) => {
  // Ejecutar la consulta SQL para eliminar todos los usuarios
  const deleteQuery = "DELETE FROM usuarios";

  db.run(deleteQuery, (err) => {
    if (err) {
      console.error("Error al eliminar todos los usuarios:", err.message);
      return res.status(500).json({ error: "Error interno del servidor." });
    }

    // Éxito al eliminar todos los usuarios
    return res.status(200).json({ success: true });
  });
};
