"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin_permission_validate = void 0;
const admin_permission_validate = (req, res, next) => {
    const isAdmin = true;
    if (isAdmin) {
        console.log("admin permissions true");
        next();
    }
    else {
        return res.status(403).json({
            error: "Acceso no autorizado. Permiso de administrador requerido.",
        });
    }
};
exports.admin_permission_validate = admin_permission_validate;
