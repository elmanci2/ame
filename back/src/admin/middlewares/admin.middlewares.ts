import { Request, Response, NextFunction } from "express";

export const admin_permission_validate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = true;

  if (isAdmin) {
    console.log("admin permissions true");
    next();
  } else {
    return res.status(403).json({
      error: "Acceso no autorizado. Permiso de administrador requerido.",
    });
  }
};
